const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const user = {
    username: 'root',
    name: 'exp',
    password: 'password',
  };
  const passwordHash = await bcrypt.hash(user.password, 10);

  const userSave = new User({
    username: user.username,
    name: user.name,
    passwordHash,
  });
  await userSave.save();
  const blogs = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: userSave.id,
  }));

  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
}, 30000);

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier property is id not _id', async () => {
    const blogs = await api.get('/api/blogs');
    const keys = Object.keys(blogs.body[0]);

    expect(keys.find((key) => key === 'id')).toBeDefined();
  });
});

describe('addition of a new note', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Panas Yang Sepi',
      author: 'anang',
      url: 'www.blog2.com',
      likes: 10,
    };
    const token = await helper.getToken(api);

    const resultBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    const blogsEnd = await helper.blogsInDb();

    expect(resultBlog.body).toEqual({
      ...blogsEnd[2],
      user: blogsEnd[2].user.toString(),
    });
  });

  test('likes property missing will default to 0', async () => {
    const newBlog = {
      title: 'Panas Yang Sepi',
      author: 'anang',
      url: 'www.blog2.com',
    };
    const token = await helper.getToken(api);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd[2].likes).toEqual(0);
  });

  test('title or url request missing will return 400 Bad Request', async () => {
    const titleBlogMissing = {
      author: 'anang',
      url: 'www.blog2.com',
      likes: 10,
    };

    const urlBlogMissing = {
      title: 'Panas Yang Sepi',
      author: 'anang',
      likes: 10,
    };
    const token = await helper.getToken(api);
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(titleBlogMissing)
      .expect(400);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(urlBlogMissing)
      .expect(400);
  });
  test('will return 401 Unauthorized if token not provided', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer `)
      .send({ title: 'token invalid', url: 'www.401.com' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const token = await helper.getToken(api);

    await api
      .delete(`/api/blogs/${blogToDelete.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('fails with status code 400 Bad Request if id is not valid', async () => {
    const token = await helper.getToken(api);
    await api
      .delete(`/api/blogs/notvalid`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('edit of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const newBlog = { ...helper.initialBlogs[0], likes: 12 };
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect({ ...blogsAtEnd[0], user: blogsAtEnd[0].user.toString() }).toEqual(
      updatedBlog.body,
    );
  });
  test('fails with status code 400 Bad Request if id is not valid', async () => {
    await api.put(`/api/blogs/notvalid`).send({ likes: 12 }).expect(400);
  });
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'dwipati',
      name: 'Dwi Pati',
      password: '123456',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Rootman',
      password: '123456',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username or password below 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'Rootman',
      password: '12',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('3 characters long');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

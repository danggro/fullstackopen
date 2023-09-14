const Blog = require('../models/blog');
const User = require('../models/user');
const initialBlogs = [
  {
    title: 'Malam yang sunyi',
    author: 'dwi',
    url: 'www.blog3.com',
    likes: 5,
  },
  {
    title: 'Temptaku Berteduh',
    author: 'anang',
    url: 'www.blog1.com',
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getToken = async (api) => {
  const login = await api.post('/api/login').send({
    username: 'root',
    password: 'password',
  });
  return login.body.token;
};
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getToken,
};

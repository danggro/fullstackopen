const blogRoutes = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { userExtractor } = require('../utils/middleware');

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRoutes.post('/', userExtractor, async (request, response) => {
  const { title, url, likes } = request.body;
  const user = request.user;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!title || !url) return response.status(400).end();

  const blog = new Blog({
    ...request.body,
    likes: likes ? likes : 0,
    user: decodedToken.id,
  });
  const result = await blog.save();

  const userDb = await User.findById(decodedToken.id);
  userDb.blogs = userDb.blogs.concat(result.id);
  await userDb.save();

  response.status(201).json(result);
});

blogRoutes.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = request.user;

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }
});

blogRoutes.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, context: 'quary' },
  );

  response.json(updatedBlog);
});

module.exports = blogRoutes;

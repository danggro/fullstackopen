const _ = require('lodash');

const dummy = (blogs) => {
  if (blogs) return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  const arrLikes = blogs.map((blog) => blog.likes);
  if (arrLikes.length > 0) {
    const result = _.chain(blogs)
      .find((blog) => blog.likes === Math.max(...arrLikes))
      .pick(['title', 'author', 'likes'])
      .value();

    return result;
  }
  return [];
};

const mostBlog = (blogs) => {
  const blog = _.chain(blogs)
    .groupBy('author')
    .values()
    .map((group) => ({ author: group[0].author, blogs: group.length }))
    .maxBy('blogs')
    .value();

  return blog;
};

const mostLikes = (blogs) => {
  const blog = _.chain(blogs).maxBy('likes').pick(['author', 'likes']).value();

  return blog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log("the following blogs were returned", blogs)
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const removedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch {
    response.status(404).send({ error: 'no such id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = {
    likes: body.likes === undefined ? 0 : body.likes
  }
  try {
    const re = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    response.json(re)
  } catch {
    response.status(404).send({ error: 'no such id' })
  }
})

blogsRouter.post('/', (request, response) => {
  const body = request.body

  //blog needs to have a title and an url
  if(!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }
  if(!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter

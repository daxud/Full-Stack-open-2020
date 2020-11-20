const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  //console.log("the following blogs were returned", blogs)
  response.json(blogs)
})


blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  var decodedToken = null
  var blog = null
  // finds the blog with the id from the request and cracks the token
  try{
    blog = await Blog.findById(request.params.id)
    decodedToken = jwt.verify(token, process.env.SECRET)
    //checks if the user that added the blog is the same as the current user (i.o.w token)
    const tokenId = decodedToken.id.toString()
    const blogUserId = blog.user
    console.log(tokenId)
    console.log(blogUserId)
    if (tokenId === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(404).send({ error: 'only the creator of blog can delete it'})
    }
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

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  var decodedToken = null
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)//TÄSSÄ tuli ERRROR, siksi try catch
  } catch {
  //if (!token || !decodedToken.id) { => tämä koodi oli valmiiksi annetussa
    return response.status(401).json({ error: 'token missing or invalid' })
  //}
}
  //tähä jäätyy
  const user = await User.findById(decodedToken.id)
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
    user: user._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})

module.exports = blogsRouter

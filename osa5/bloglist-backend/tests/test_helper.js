const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "testi blogi 2",
      author: "akseli2",
      url: "www.testi2.fi",
      likes: "200"
    },
    {
      title: "testi blogi 1",
      author: "akseli1",
      url: "www.testi1.fi",
      likes: "100"
    },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
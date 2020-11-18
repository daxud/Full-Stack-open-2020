const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

test('identificator is called "id"', async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()

})

test('blogs can be added', async () => {
    const newBlog = {
        title: "testi blogi 3",
        author: "akseli3",
        url: "www.testi3.fi",
        likes: "300"
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const allBlogs = await api.get('/api/blogs')
    //checks if the blog got added to the server
    expect(allBlogs.body).toHaveLength(initialBlogs.length + 1)
})

test('blogs can be added without like field', async () => {
    const newBlog = {
        title: "testi blogi 3",
        author: "akseli3",
        url: "www.testi3.fi",
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    //checks if the value of like is equal to 0
    const allBlogs = await api.get('/api/blogs')
    lastaddedblog = (allBlogs.body)[allBlogs.body.length - 1]
    expect(lastaddedblog.likes).toEqual(0)
})

test('blogs can not be added without title and url fields', async() => {
    const newBlog1 = {
        author: "akseli3",
        url: "www.testi3.fi",
    }
    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)

    const newBlog2 = {
        title: "testi blogi 3",
        author: "akseli3"
    }
    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
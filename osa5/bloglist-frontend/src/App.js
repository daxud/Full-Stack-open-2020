import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //saves the token
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [fail, setFail] = useState(null)

  // checks if the local storage has data for a successfull login
  // if yes, then sets the value of user to it (from localstorage)
  useEffect( ()  => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      console.log(loggedUser)
      setUser(loggedUser)
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({
        username, password
      })
      //makes it json because otherwise it is a object and i cant call its attributes
      const jsonUser = JSON.stringify(returnedUser)
      console.log(jsonUser)
      // here the token is set to the local storage of the browser
      window.localStorage.setItem('loggedUser', jsonUser)
      blogService.setToken(returnedUser.token)
      setUser(jsonUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password')
      setFail(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const createBlog = async (blogJSON) => {
    //console.log(blogJSON)
    const currentUser = JSON.parse(user)
    console.log(currentUser)
    blogFormRef.current.toggleVisibility()
    const response = await blogService.createBlog(blogJSON)
    console.log(response)
    //this causes problems because the user need to reload the page for the user to show correctly
    setBlogs(blogs.concat({ ...response, user: currentUser }))
    setNotification(`a new blog ${blogJSON.title} by ${blogJSON.author} added`)
    setFail(false)
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const compareLikes = (a,b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }

  const likeBlog = async (blogId) => {
    // 1. finds the blog with the wanted id
    // 2. formats the blog for our put request
    // 3. updates the react page and the backend
    let blog = blogs.find(b => b.id === blogId)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id !== undefined ? blog.user.id : blog.user
    }
    setBlogs(blogs.map(b => b.id !== blogId ? b : { ...updatedBlog, user: blog.user }).sort(compareLikes))
    console.log(updatedBlog)
    //updates the server => we could also use the "updatedBlog" for our "setBlogs" function but it causes delay
    await blogService.update(updatedBlog)
  }

  const deleteBlog = async (blogId, userId) => {
    const currentUser = JSON.parse(user)
    console.log(currentUser.id)
    console.log(userId)
    if (userId === currentUser.id) {
      if (window.confirm('do you want to remove this blog')) {
        setBlogs(blogs.filter(b => b.id !== blogId))
        const response = await blogService.remove(blogId)
        console.log(response)
      }
    }
  }

  const loginForm = () => (
    <form id='loginForm' onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(compareLikes))
    )
  }, [])


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} fail={fail}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} fail={fail}/>
      <div>
        You are logged in as {JSON.parse(user).name}
        <button id='logout' onClick={ () => {
          window.localStorage.clear()
          window.location.reload()
        }
        }>logout</button>
      </div>
      <br></br>
      <div>
        <h2>create new</h2>
        <Togglable id="createNew" buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>
      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}


export default App
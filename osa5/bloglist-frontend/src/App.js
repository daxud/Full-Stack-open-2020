import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  //saves the token
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [fail, setFail] = useState(null)
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  // checks if the local storage has data for a successfull login
  // if yes, then sets the value of user to it (from localstorage)
  useEffect( ()  => {
    const loggedUserToken = window.localStorage.getItem('loggedUser')
    if (loggedUserToken) {
      setUser(loggedUserToken)
      blogService.setToken(loggedUserToken)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(JSON.stringify(user))
      // here the token is set to the local storage of the browser
      window.localStorage.setItem('loggedUser', user.token)
      blogService.setToken(user.token)
      setUser(user.token)
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

  const createBlog = async (event) => {
    //this prevents the form reloading the page
    event.preventDefault()
    const blogJSON = {
      "title": title,
      "author": author,
      "url": url
    }
    console.log(blogJSON)
    const response = await blogService.createBlog(blogJSON)
    setBlogs(blogs.concat(response))
    setNotification(`a new blog ${title} by ${author} added`)
    setFail(false)
    setTimeout(()=> {setNotification(null)}, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        You are logged in
        <button onClick={ () => {
          window.localStorage.clear()
          window.location.reload()
          }
        }>logout</button>
      </div>
      <br></br>
      <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        title:
        <input value={title} onChange={({target}) =>setTitle(target.value)}></input><br></br>
        author:
        <input value={author} onChange={({target}) => setAuthor(target.value)}></input><br></br>
        url:
        <input value={url} onChange={({target}) => setUrl(target.value)}></input>
        <br></br>
        <button type="submit">create</button>
      </form>
      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
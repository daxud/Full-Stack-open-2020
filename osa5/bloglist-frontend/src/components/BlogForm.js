import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const addBlog = (event) => {
    event.preventDefault()
    const blogJSON = {
      'title': title,
      'author': author,
      'url': url
    }

    createBlog(blogJSON)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form id='form' onSubmit={addBlog}>
        title:
        <input id='title' value={title} onChange={handleTitleChange}></input><br></br>
        author:
        <input id='author' value={author} onChange={handleAuthorChange}></input><br></br>
        url:
        <input id='url' value={url} onChange={handleUrlChange}></input>
        <br></br>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
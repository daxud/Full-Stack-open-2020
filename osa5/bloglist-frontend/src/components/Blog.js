import React from 'react'
import { useState } from 'react'


const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisibility] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = () => {
    likeBlog(blog.id)
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog.user.id !== undefined ? blog.user.id : blog)
  }

  const user = () => {
    if (blog.user !== undefined) {
      if (blog.user.name !== undefined) {
        return blog.user.name
      } else {
        return blog.user
      }
    } else {
      //this case is for tests, because there is no logged user
      return 'Test User'
    }
  }

  return(
    <div style={blogStyle} className='blog' id='blog-element'>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisibility(false)} style={showWhenVisible}>hide</button>
        <button onClick={() => setVisibility(true)} style={hideWhenVisible}>show more</button>
        <div style={showWhenVisible} className='togglableContent'>
          {blog.url}<br/>
          likes {blog.likes}
          <button className='like-class' id='like-button'onClick={increaseLikes}>like</button>
          <br/>
          {user()}<br/>
          <button id='remove-button' onClick={removeBlog} style={showWhenVisible}>remove blog</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

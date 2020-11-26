import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const create = jest.fn()

  const component = render(
    <BlogForm createBlog={create} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  // inputs the needed fields and submits the new blog
  fireEvent.change(title, {
    target: { value: 'Test Title' }
  })
  fireEvent.change(author, {
    target: { value: 'Test Author' }
  })
  fireEvent.change(url, {
    target: { value: 'www.test.com' }
  })
  fireEvent.submit(form)

  expect(create.mock.calls).toHaveLength(1)
  console.log(create.mock.calls[0][0].title)
  expect(create.mock.calls[0][0].title).toBe('Test Title')
  expect(create.mock.calls[0][0].author).toBe('Test Author')
  expect(create.mock.calls[0][0].url).toBe('www.test.com')
})
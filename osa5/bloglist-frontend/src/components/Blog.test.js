import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'


describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  const blog = {
    title: 'testi blogi 2',
    author: 'akseli2',
    url: 'www.testi2.fi',
    likes: '200'
  }

  beforeEach( () => {
    //we need to login first

    component = render(
      <Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler} />
    )
  })


  test('renders title and author', () => {
  // testaa että oletusarvoisesti title ja author näkyvät
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
  })

  test('url and likes are not visible at beginning', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the "show more" button url and likes are visible', async () => {
    const button = component.getByText('show more')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    //expect(mockHandler.mock.calls).toHaveLength(1)

  })

  test('clicking the like button twice, calls the eventHandler twice', () => {
    // first clicks the "show more" button to show the like button
    const button = component.getByText('show more')
    fireEvent.click(button)

    // then clicks the like button twice
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  let blog
  beforeEach(() => {
    blog = {
      author: 'bob',
      title: 'This is a blog title',
      url: 'www.blog.com',
      likes: 0,
    }

    component = render(
      <Blog
        blog={blog}
        allowRemove={false}
        likeBlog={() => {}}
        removeBlog={() => {}}
      />
    )
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.title)
  })

  test('details (url and likes) are not displayed by default', () => {
    const details = component.container.querySelector('.details')
    expect(details).toHaveStyle('display: none')
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent(blog.likes)
  })

  test('after clicking the button, details(url and likes) are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const details = component.container.querySelector('.details')
    expect(details).not.toHaveStyle('display: none')
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent(blog.likes)
  })
})
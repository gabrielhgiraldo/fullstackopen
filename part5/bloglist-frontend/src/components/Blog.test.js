import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
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

  test('url and likes are not displayed by default', () => {
    const details = component.container.querySelector('.details')
    expect(details).toHaveStyle('display: none')
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent(blog.likes)
  })
})
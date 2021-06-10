import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog}/>)

    const authorInput = component.container.querySelector('#author')
    fireEvent.change(authorInput, {
      target: {
        value: 'bob'
      }
    })

    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput, {
      target:{
        value: 'blog title'
      }
    })

    const urlInput = component.container.querySelector('#url')
    fireEvent.change(urlInput, {
      target: {
        value: 'www.blog.com'
      }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toMatchObject({
      author: 'bob',
      title: 'blog title',
      url: 'www.blog.com'
    })
  })
})
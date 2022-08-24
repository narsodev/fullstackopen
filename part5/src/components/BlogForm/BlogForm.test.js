import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './index'

const blogToAdd = {
  title: 'Testing is great!',
  author: 'Tester',
  url: 'http://tests.com'
}

describe('<BlogForm', () => {
  let mockHandlerAddBlog

  beforeEach(() => {
    mockHandlerAddBlog = jest.fn()
    render(<BlogForm handleAddBlog={mockHandlerAddBlog}/>)
  })

  test('calls the event handler received as props with the right details when a new blog is added', async () => {
    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')

    const user = userEvent.setup()

    await user.type(titleInput, blogToAdd.title)
    await user.type(authorInput, blogToAdd.author)
    await user.type(urlInput, blogToAdd.url)

    const submit = screen.getByText('create blog')

    await user.click(submit)

    const { calls } = mockHandlerAddBlog.mock
    expect(calls).toHaveLength(1)

    const { title, author, url } = calls[0][0]

    expect(title).toBe(blogToAdd.title)
    expect(author).toBe(blogToAdd.author)
    expect(url).toBe(blogToAdd.url)
  })
})
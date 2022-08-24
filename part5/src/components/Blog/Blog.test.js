import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './index'

const blog = {
  title: 'test',
  author: 'tester',
  user: {
    username: 'narso2',
    name: 'narso2',
    id: '6305494c613e757f6bd164b4'
  },
  url: 'fdff',
  likes: 6,
  id: '630549e5613e757f6bd164cd'
}

const user = blog.user.username
const handleLike = () => {}
const handleDelete = () => {}

describe('<Blog />', () => {
  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={user}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />)
  })

  test(
    'renders the blog\'s title and author, but does not render its url or number of likes by default',
    () => {
      screen.getByText(`${blog.title} ${blog.author}`)

      const url = screen.queryByText(`url: ${blog.url}`)
      expect(url).toBeNull()

      const likes = screen.queryByText(`likes ${blog.likes}`)
      expect(likes).toBeNull()
    }
  )

  test('renders the blog\'s url and number of likes when button to show details is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    screen.getByText(`url: ${blog.url}`)
    screen.getByText(`likes ${blog.likes}`)
  })
})
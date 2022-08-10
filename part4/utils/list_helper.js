const dummy = blogs => 1

const totalLikes = blogs => blogs
  .reduce((prev, cur) => prev + cur.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const mostLiked = blogs.find(blog => blog.likes === maxLikes)

  const { title, author, likes } = mostLiked

  return {
    title,
    author,
    likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const authorsBlogs = blogs.reduce((prev, cur) => {
    const prevBlogs = prev[cur.author] || 0

    return { ...prev, [cur.author]: prevBlogs + 1 }
  }, {})

  const maxBlogs = Math.max(...Object.values(authorsBlogs))

  const authorWithMostBlogs = Object.entries(authorsBlogs).find(([author, blogs]) => blogs === maxBlogs)

  const [author, numberOfBlogs] = authorWithMostBlogs

  return {
    author,
    blogs: numberOfBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

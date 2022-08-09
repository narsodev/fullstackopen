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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

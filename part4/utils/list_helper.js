const dummy = blogs => 1

const totalLikes = blogs => blogs
  .reduce((prev, cur) => prev + cur.likes, 0)

module.exports = {
  dummy,
  totalLikes
}

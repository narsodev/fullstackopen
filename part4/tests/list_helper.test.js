const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [blogs[0]]

const listWithBlogsOfSameAuthor = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('when a list has several blogs, equals the sum of likes of those blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has no blogs, equals null', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBeNull()
  })

  test('when list has one blog, equals that blog', () => {
    const [blog] = listWithOneBlog
    const { title, author, likes } = blog

    const expectedResult = {
      title,
      author,
      likes
    }

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('when list has several blogs, equals the most liked blog', () => {
    const mostLikedBlog = blogs[2]
    const { title, author, likes } = mostLikedBlog

    const expectedResult = {
      title,
      author,
      likes
    }

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expectedResult)
  })
})

describe('most blogs', () => {
  test('when list has no blogs, equals null', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toBeNull()
  })

  test('when list has blogs of only one author, equals author and the number of blogs', () => {
    const [blog] = listWithBlogsOfSameAuthor
    const { author } = blog

    const expectedResult = {
      author,
      blogs: listWithBlogsOfSameAuthor.length
    }

    const result = listHelper.mostBlogs(listWithBlogsOfSameAuthor)
    expect(result).toEqual(expectedResult)
  })

  test('when list has several blogs, equals the author with most blogs and the number of his blogs', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expectedResult)
  })
})

describe('most likes', () => {
  test('when list has no blogs, equals null', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    expect(result).toBeNull()
  })

  test('when list has blogs of only one author, equals author and the sum of likes', () => {
    const [blog] = listWithBlogsOfSameAuthor
    const { author } = blog

    const expectedResult = {
      author,
      likes: 12
    }

    const result = listHelper.mostLikes(listWithBlogsOfSameAuthor)
    expect(result).toEqual(expectedResult)
  })

  test('when list has several blogs, equals the author with most likes and the sum of his likes', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 19
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expectedResult)
  })
})

require('dotenv').config({ path: '.env.local' })
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

morgan.token('body', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(persons => res.json(persons))
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person
    .findById(id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name)
    return res.status(400).json({ error: 'name missing' })
  if (!number)
    return res.status(400).json({ error: 'number missing' })

  const person = new Person({ name, number })

  person.save()
    .then(person => res.status(201).json(person))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  const { name, number } = req.body

  if (!name)
    return res.status(400).json({ error: 'name missing' })
  if (!number)
    return res.status(400).json({ error: 'number missing' })

  Person
    .findByIdAndUpdate(id, { name, number }, { new: true })
    .then(person => {
      if (person)
        res.status(200).json(person)
      else
        res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person
    .findByIdAndDelete(id)
    .then(result => {
      if (result)
        res.status(204).end()
      else
        res.status(404).end()
    })
    .catch(next)
})

app.get('/info', (req, res) => {
  const currentDate = new Date()

  const infoMessage =
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>`

  res.send(infoMessage)
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError')
    return res.status(400).send({
      error: 'malformatted id'
    })

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
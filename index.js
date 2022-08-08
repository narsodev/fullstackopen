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

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params

  Person
    .findById(id)
    .then(person => res.json(person))
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name)
    return res.status(400).json({ error: 'name missing' })
  if (!number)
    return res.status(400).json({ error: 'number missing' })

  const person = new Person({ name, number })

  person.save()
    .then(person => res.status(201).json(person))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => id === person.id)

  if (!person)
    return res.status(404).send()
  
  persons = persons.filter(person => id !== person.id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const currentDate = new Date()

  const infoMessage =
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>`

  res.send(infoMessage)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
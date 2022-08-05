const express = require('express')
const morgan = require('morgan')

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

app.use(express.json())

morgan.token('body', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => id === person.id)

  if (!person)
    return res.status(404).end()

  res.json(person)
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name)
    return res.status(400).json({ error: 'name missing' })
  if (!number)
    return res.status(400).json({ error: 'number missing' })
  
  const personAlreadyExists = persons.some(person => person.name === name)
  if (personAlreadyExists)
    return res.status(400).json({ error: 'name must be unique' })

  const id = Math.floor(Math.random() * 100000)
  const person = { id, name, number }

  persons.push(person)

  res.status(201).json(person)
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

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
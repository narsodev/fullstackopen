import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const renderedPersons = filter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addNewPerson = event => {
    event.preventDefault()

    const alreadyExists = persons.some(person => person.name === newName)
    if (alreadyExists)
      return alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map(person => person.id)) + 1
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={event => setFilter(event.target.value)} />

      <h2>Add a new</h2>

      <PersonForm
        handlePersonSubmit={addNewPerson}
        newName={newName}
        handleNameChange={event => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumberChange={event => setNewNumber(event.target.value)}
      />

      <h2>Numbers</h2>

      <Persons persons={renderedPersons}/>
    </div>
  )
}

export default App
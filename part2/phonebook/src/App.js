import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        const { data } = response
        setPersons(data)
      })
    }, [])

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
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', newPerson)
      .then(response => {
        const { data: returnedPerson } = response

        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        console.error(err)
        alert(`error adding ${newName} to phonebook`)
      })

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
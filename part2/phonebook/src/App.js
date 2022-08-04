import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons)
      .catch(err => {
        console.error(err)
        alert('error retrieving data')
      })
    }, [])

  const renderedPersons = filter !== ''
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

    personService.create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        console.error(err)
        alert(`error adding ${newName} to phonebook`)
      })
  }

  const deletePerson = ({ id, name }) => {
    personService.delete(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => {
        console.error(err)
        alert(`error deleting ${name} from phonebook`)
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

      <Persons persons={renderedPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
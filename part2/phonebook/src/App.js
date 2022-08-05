import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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

  const createNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(notification => notification === message ? null : notification)
    }, 5000)
  }

  const updatePerson = id => {
    const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if (!confirm) return

    const personToUpdate = {
      name: newName,
      number: newNumber,
      id
    }

    personService.update(personToUpdate)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id
          ? updatedPerson
          : person
        ))
        setNewName('')
        setNewNumber('')
        createNotification(`Updated ${updatedPerson.name}`)
      })
      .catch(err => {
        console.error(err)
        alert(`error updating ${personToUpdate.name}`)
      })
  }

  const addNewPerson = event => {
    event.preventDefault()

    const repeatedPerson = persons.find(person => person.name === newName)
    if (repeatedPerson)
      return updatePerson(repeatedPerson.id)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson)
      .then(createdPerson => {
        setPersons([...persons, createdPerson])
        setNewName('')
        setNewNumber('')
        createNotification(`Added ${createdPerson.name}`)
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

      <Notification message={notification} />

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
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewPerson = event => {
    event.preventDefault()
    
    const alreadyExists = persons.some(person => person.name === newName)
    if (alreadyExists)
      return alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName
    }
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map(person => <p key={person.name}>{person.name}</p>)
        }
      </div>
    </div>
  )
}

export default App
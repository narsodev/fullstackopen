const Person = ({ person, deletePerson }) => {
  const handleDeleteClick = () => {
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (!confirm) return

    deletePerson({ id: person.id, name: person.name })
  }

  return (
    <div>
      {person.name} {person.number}&nbsp;
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => (
  <div>
    {
      persons.map(person => (
        <Person
          person={person}
          deletePerson={deletePerson}
          key={person.id}
        />
      ))
    }
  </div>
)

export default Persons
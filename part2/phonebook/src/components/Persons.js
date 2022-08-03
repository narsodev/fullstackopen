const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => (
  <div>
    {
      persons.map(person => (
        <Person person={person} key={person.id} />
      ))
    }
  </div>
)

export default Persons
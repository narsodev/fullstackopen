const mongoose = require('mongoose')

const [, , password, name, number] = process.argv

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    `"node mongo.js <password>" to show people added to phonebook
"node mongo.js <password> <name> <number> to add person to phonebook`
  )
  process.exit(1)
}

const uri = `mongodb+srv://narsodev-admin:${password}@cluster0.ljc1z.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(uri)
  .then(() => {
    if (name && number) {
      const person = new Person({
        name,
        number
      })

      return person.save()
        .then(person => {
          const { name, number } = person

          console.log(`added ${name} number ${number} to phonebook`)
        })
        .catch(() => console.error('Error saving person to phonebook'))
        .finally(() => mongoose.connection.close())
    }

    Person.find({})
      .then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
      .catch(() => console.error('Error getting phonebook'))
      .finally(() => mongoose.connection.close())
  })
  .catch(err => console.error(err.message))

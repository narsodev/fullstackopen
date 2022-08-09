const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Server connected to MongoDB')
  })
  .catch(error => {
    console.error(`Error connecting to MongoDB: ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: number => {
        if (!number.split('').every(c => (c >= '0' && c <= '9') || c === '-')) {
          return false
        }

        const splitted = number.split('-')

        if (splitted.length !== 2) return splitted.length === 1

        const [first] = splitted

        return first.length >= 2 && first.length <= 3
      }
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', personSchema)

module.exports = Person

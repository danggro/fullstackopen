const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  return process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://anangdwin55:${password}@cluster0.hhkr6se.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv[2] && process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((persons) => console.log(persons))
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`,
    )
    mongoose.connection.close()
  })
}

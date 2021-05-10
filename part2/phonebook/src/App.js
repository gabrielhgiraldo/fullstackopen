import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const personsToShow = nameFilter.length 
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    : persons

  const addNewName = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      const person = {
        name:newName,
        number:newNumber
      }
      setPersons(persons.concat(person))
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm newName={newName} addNewName={addNewName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './components/PersonService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const personsToShow = nameFilter.length 
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    : persons

  const addNewPerson = (event) => {
    event.preventDefault()
    let newPerson = {
      name:newName,
      number:newNumber
    }
    if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      personService
        .create(newPerson)
        .then(
          response => setPersons(persons.concat(response.data)),
          () => console.log('failed to add person')
        )
    }
    else {
      newPerson = {...newPerson, id:persons.find(person => person.name === newPerson.name).id}
      const msg = `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
      if (window.confirm(msg)){
          personService
            .update(newPerson)
            .then(
              () => {
                const updatedPersons = persons.map(person => person.id == newPerson.id ? newPerson : person)
                setPersons(updatedPersons)
              },
              () => console.log('failed to update person')
            )
        }
    }
   
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (personToRemove) => {
    if(window.confirm(`remove ${personToRemove.name}?`)){
      personService
        .remove(personToRemove.id)
        .then(
          () => setPersons(persons.filter(person => person.id !== personToRemove.id)),
          () => console.log(`failed to remove ${personToRemove.name}`)
        )
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        addNewPerson={addNewPerson} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}></Persons>
    </div>
  )
}

export default App

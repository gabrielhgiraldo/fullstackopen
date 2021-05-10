import React, { useState } from 'react'

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
      <div>
        filter shown with: <input value={nameFilter} onChange={handleFilterChange}></input>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={newNumber} onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person=>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App

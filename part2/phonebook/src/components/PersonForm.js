import React from 'react'

const PersonForm = ({addNewPerson, handleNameChange, newNumber, newName, handleNumberChange}) => {
    return (
    <form onSubmit={addNewPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>

        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm
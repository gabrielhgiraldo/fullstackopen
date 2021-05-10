import React from 'react'

const PersonForm = ({addNewName, handleNameChange, newNumber, newName, handleNumberChange}) => {
    return (
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
    )
}

export default PersonForm
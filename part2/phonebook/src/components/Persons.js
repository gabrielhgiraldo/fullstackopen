import React from 'react'

const Persons = ({personsToShow, removePerson}) => {
    return (
        personsToShow.map(person=>
            <div key={person.name}>
                {person.name} {person.number} 
                <button onClick={() => removePerson(person)}>remove</button>
            </div>
        )
    )
}

export default Persons
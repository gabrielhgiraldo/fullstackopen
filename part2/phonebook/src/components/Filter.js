import React from 'react'

const Filter = ({nameFilter, handleFilterChange}) => {
    return (
    <div>
        filter shown with: <input value={nameFilter} onChange={handleFilterChange}></input>
    </div>
    )
}

export default Filter
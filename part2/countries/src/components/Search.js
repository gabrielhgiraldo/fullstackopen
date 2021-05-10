import React from 'react'

const Search = ({searchQuery, handleSearchChange}) => {
    return (
        <div>find countries <input value={searchQuery} onChange={handleSearchChange}></input></div>
    )
}

export default Search
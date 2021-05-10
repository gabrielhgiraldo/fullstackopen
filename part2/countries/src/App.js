import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ countries, setCountries ] = useState([])
  
  const countriesToShow = searchQuery.length 
  ? countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
  : []

  const handleSearchChange = event => setSearchQuery(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  return (
    <div>
      <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange}></Search>
      <Countries countries={countriesToShow}></Countries>
    </div>
  )
}
export default App;

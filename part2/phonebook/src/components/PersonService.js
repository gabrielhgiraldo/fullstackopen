import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)
const create = newPerson => axios.post(baseUrl, newPerson)
const remove = personId => axios.delete(`${baseUrl}/${personId}`)

const personService = {getAll, create, remove}
export default personService
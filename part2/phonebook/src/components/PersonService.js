import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)
const create = newPerson => axios.post(baseUrl, newPerson)
const remove = personId => axios.delete(`${baseUrl}/${personId}`)
const update = person => axios.put(`${baseUrl}/${person.id}`, person)

const personService = {getAll, create, remove, update}
export default personService
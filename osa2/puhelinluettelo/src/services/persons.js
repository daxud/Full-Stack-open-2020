import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return (request.then(response => response.data))
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return (request.then(response => response.data))
}

const remove = (id) => {
    const deleteUrl = baseUrl + "/" + id
    const request = axios.delete(deleteUrl)
    return (request.then(response => response.data))
}

const update = (id, updatedPerson) => {
    const updateUrl = baseUrl + "/" + id
    const request = axios.put(updateUrl, updatedPerson)
    return (request.then(response => response.data))
}

export default { getAll, create, remove, update }
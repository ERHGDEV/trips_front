import axios from 'axios'

const API_URL = 'https://trip-api-henna.vercel.app/api/trips'

const getAll = () => {
    const req = axios.get(API_URL)
    return req.then( res => {
        return res.data
    })
}

const create = newObject => {
    const req = axios.post(API_URL, newObject)
    return req.then( res => {
        return res.data
    })
}

const update = ( id, newObject ) => {
    const req = axios.put(`${API_URL}/${id}`, newObject)
    return req.then( res => {
        return res.data
    })
}

const destroy = ( id ) => {
    const req = axios.delete(`${API_URL}/${id}`)
    return req.then( res => {
        return res.data
    })
}

export default { getAll, create, update, destroy }
import axios from 'axios';

const baseURL='http://localhost:3001/persons';

const getAll=()=>{
    return axios.get(baseURL)
}

const create=(newObject)=>{
    return axios.post(baseURL,newObject)
}

const deletee=(id,newObject)=>{
    return axios.delete(`${baseURL}/${id}`,newObject)
}
const updates=(id,newObject)=>{
    return axios.put(`${baseURL}/${id}`,newObject)
}

export default{
    getAll:getAll,
    create:create,
    deletee:deletee,
    updates:updates
}
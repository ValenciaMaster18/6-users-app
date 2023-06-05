import axios from "axios"
import config from './config.json';

// const URL = "http://localhost:3333/users"
const URL = `${config.apiUrl}/users`

export const findAll = async () => {
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (error) {
        console.log(error)
    }
    return null
}

export const saveUser = async ({ username, email, password }) => {
    try {
        return await axios.post(URL, {
            username,
            email,
            password
        })

    } catch (error) {
        throw error
    }
}

export const updateUser = async ({ id, username, email }) => {
    try {
        return await axios.put(URL+"/"+id, {
            username,
            email
        })
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        return await axios.delete(URL+"/"+id)
    } catch (error) {
        console.log(error)
    }
    return undefined;
}
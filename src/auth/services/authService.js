import axios from "axios"
import config from './config.json';

const URL = `${config.apiUrl}/login`

export const loginService = async ({username, password}) => {
    try {
        return await axios.post(URL, {
            username,
            password
        })
    } catch (error) {
        throw error
    }
}
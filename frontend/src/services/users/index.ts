import axios from "axios";
import { RegisterResponse, UserResponse } from "../../interfaces/response.interface";

const register = async (username: string, password: string): Promise<RegisterResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const loginData = {username, password}
    const data = await axios.post(`${url}/users`, loginData)
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const get = async (id: string, token: string): Promise<UserResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const data = await axios.post(`${url}/users/${id}`, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export { register, get }
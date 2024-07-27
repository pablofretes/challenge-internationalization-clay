import axios from "axios";
import { LoginResponse } from "../../interfaces/response.interface";

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const loginData = {username, password}
    const data = await axios.post(`${url}/auth`, loginData)
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export { login }
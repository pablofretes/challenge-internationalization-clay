import axios from "axios";
import { WordResponse, WordListResponse, DeleteWordResponse } from "../../interfaces/response.interface";
import { Translations } from "../../interfaces/translations.interface";

const list = async (token: string): Promise<WordListResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const data = await axios.get(`${url}/words`, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const get = async (title: string, token: string): Promise<WordResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const data = await axios.get(`${url}/words/${title}`, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const update = async (token: string, uuid: string, translations?: Translations): Promise<WordResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const updateData = { translations }
    const data = await axios.patch(`${url}/words/${uuid}`, updateData, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const create = async (token: string, title: string, translations: Translations): Promise<WordResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const createData = { title, translations }
    const data = await axios.post(`${url}/words`, createData, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const remove = async (token: string, title: string): Promise<DeleteWordResponse | null> => {
  try {
    const url = process.env.REACT_APP_API as string
    const headers = { Authorization: `Bearer ${token}`}
    const data = await axios.delete(`${url}/words/${title}`, { headers })
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export { list, get, update, create, remove }
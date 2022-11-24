
import axios from '../Axios/axios'

export const getUser = (userId) => axios.get(`/users/${userId}`)




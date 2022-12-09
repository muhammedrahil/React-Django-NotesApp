
import axios from 'axios'

const instence = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
})

export default instence;


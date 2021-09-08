import axios from 'axios'
import { BASE_URL } from './config'
export function getSongList (id) {
  return axios({
    url: `${BASE_URL}/playlist?id=${id}`
  })
}

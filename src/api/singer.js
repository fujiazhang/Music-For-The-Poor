import axios from 'axios'
import { BASE_URL } from './config'
export function getSongList (name, page) {
  return axios({
    url: `${BASE_URL}/search?keyword=${name}&&pageNo=${page}`
  })
}

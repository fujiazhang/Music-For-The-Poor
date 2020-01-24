import axios from 'axios'
import { BASE_URL } from './config'
export function getNewSong () {
  return axios({
    url: `${BASE_URL}/new/songs`
  })
}

export function getDiscList () {
  return axios({
    url: `${BASE_URL}/recommend/playlist`
  })
}

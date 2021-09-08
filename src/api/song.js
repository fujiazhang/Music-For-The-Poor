import axios from 'axios'
import { BASE_URL } from './config'
export function getSongUrl (id, cid) {
  return axios({
    url: `${BASE_URL}/song/url?id=${id}&cid=${cid}&needPic=1`
  })
}

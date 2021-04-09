import axios from 'axios'
import { BASE_URL } from './config'
export function getMv (id) {
  return axios({
    url: `${BASE_URL}/mv`
  })
}
// 服务端逻辑  http://www.xbeibeix.com/api/bilibiliapi.php?url=https://www.bilibili.com/&aid=[视频AID]&cid=[视频CID]
export function getVideoUrl (aid, cid) {
  return axios({
    url: `${BASE_URL}/video?aid=${aid}&&cid=${cid}`
  })
}

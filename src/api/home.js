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
export function getHotWords () {
  return axios({
    url: `${BASE_URL}/new/hotwords`
  })
}
/*
 参数：
 keyword: 搜索关键词 必填
 type: 默认 song，支持：song, playlist, mv, singer, album, lyric
 pageno: 默认 1
*/
export function getHotWordsSearch (keyword) {
  return axios({
    url: `${BASE_URL}/search?keyword=${keyword}`
  })
}

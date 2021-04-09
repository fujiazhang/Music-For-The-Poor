// import { getLyric, getSongsUrl } from 'api/song'
// import { ERR_OK } from 'api/config'
// import { Base64 } from 'js-base64'

export default class Song {
  constructor ({ id, cid, singer, name, image, url }) {
    this.id = id
    this.cid = cid
    this.singer = singer
    this.name = name
    this.image = image
    this.url = url
  }

  //   getLyric () {
  //     if (this.lyric) {
  //       return Promise.resolve(this.lyric)
  //     }

//     return new Promise((resolve, reject) => {
//       getLyric(this.mid).then((res) => {
//         if (res.retcode === ERR_OK) {
//           this.lyric = Base64.decode(res.lyric)
//           resolve(this.lyric)
//         } else {
//           reject(new Error('no lyric'))
//         }
//       })
//     })
//   }
}

export function createSong (id, cid, singer, name, image, url) {
  return new Song({
    id: id,
    cid: cid,
    singer: singer,
    name: name,
    image: image,
    url: url
  })
}
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

// export function isValidMusic (musicData) {
//   return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
// }

// export function processSongsUrl (songs) {
//   if (!songs.length) {
//     return Promise.resolve(songs)
//   }
//   return getSongsUrl(songs).then((purlMap) => {
//     songs = songs.filter((song) => {
//       const purl = purlMap[song.mid]
//       if (purl) {
//         song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
//         return true
//       }
//       return false
//     })
//     return songs
//   })
// }

import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'

// export const selectPlay = function ({ commit, state }, { list, index }) {
//   commit('SET_SEQUENCE_LIST', list)
//   if (state.mode === playMode.random) {
//     let randomList = shuffle(list)
//     commit('SET_PLAYLIST', randomList)
//     index = findIndex(randomList, list[index])
//   } else {
//     commit('SET_PLAYLIST', list)
//   }
//   commit('SET_CURRENT_INDEX', index)
//   commit('SET_FULLSCREEN', true)
//   commit('SET_PLAYING_STATE', true)
// }

export const selectPlay = async function ({ commit, dispatch, state }, { item }) {

  let index = findIndex(state.playlist, item)
  if (index == -1) {
    // 不存在
    let list = JSON.parse(JSON.stringify(state.playlist))
    list.push(item)
    commit('SET_SEQUENCE_LIST', list)
    commit('SET_PLAYLIST', list)
    commit('SET_CURRENT_INDEX', list.length - 1)
  } else {
    commit('SET_CURRENT_INDEX', index)
  }
  commit('SET_PLAYING_STATE', true)
  commit('SET_FULLSCREEN', true)

  // commit('SET_SEQUENCE_LIST', list)
  // if (state.mode === playMode.random) {
  //   let randomList = shuffle(list)
  //   commit('SET_PLAYLIST', randomList)
  //   index = findIndex(randomList, list[index])
  // } else {
  //   commit('SET_PLAYLIST', list)
  // }
  // commit('SET_CURRENT_INDEX', index)
  // commit('SET_FULLSCREEN', true)
  // commit('SET_PLAYING_STATE', true)
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.songmid === song.songmid
  })
}

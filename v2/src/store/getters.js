export const disc = (state) => {
  return state.disc
}

export const playerIconColor = state => {
  return state.playerIconColor
}

export const fullScreen = state => {
  return state.fullScreen
}

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
  // 通过计算Index获取当前currentSong 修改index响应 类似计算属性
  // 如果没有url和封面信息 在player组件里请求后获取数据后 替换修改currentSong
}
export const playing = state => state.playing

export const playlist = (state) => state.playlist

export const mode = state => state.mode

export const searchBoxFocue = state => state.searchBoxFocue

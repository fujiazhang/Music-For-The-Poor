const mutations = {
  SET_DISC (state, disc) {
    state.disc = disc
  },
  SET_PLAY_ICON_COLOR (state, color) {
    state.playerIconColor = color
  },
  SET_FULLSCREEN (state, fullState) {
    state.fullScreen = fullState
  },
  SET_CURRENT_INDEX (state, index) {
    state.currentIndex = index
  },
  SET_SEQUENCE_LIST (state, list) {
    state.sequenceList = list
  },
  SET_PLAY_MODE (state, mode) {
    state.mode = mode
  },
  SET_PLAYLIST (state, list) {
    state.playlist = list
  },
  SET_PLAYING_STATE (state, flag) {
    state.playing = flag
  },
  SET_SEARCHBOX_FOCUS (state, flag) {
    state.searchBoxFocue = flag
  }
}
export default mutations

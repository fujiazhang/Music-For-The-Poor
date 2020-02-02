import { playMode } from '@/common/js/config'
const state = {
  disc: {},
  playerIconColor: 'black',
  fullScreen: false,
  currentIndex: -1,
  playing: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  searchBoxFocue: false
}
export default state

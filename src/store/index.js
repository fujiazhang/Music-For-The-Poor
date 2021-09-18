import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'


export default createStore({
  state,
  getters,
  mutations,
  actions,
})

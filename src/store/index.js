import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)


// 创建store对象
const index = new Vuex.Store({
  state,
  mutations, //唯一目的就是修改state中状态  每个方法完成的事件比较单一
  actions,//判断逻辑放到这
  getters,
})

export default index

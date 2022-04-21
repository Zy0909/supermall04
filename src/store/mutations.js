import {
  ADD_COUNTER,//导入两个常量
  ADD_TO_CART
} from './mutations-type'

const mutations = {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }
}


export default mutations

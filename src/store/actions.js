import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

const actions = {
  addCart(context, payload) {
    //dispatch返回一个promise,传入resolve   这个promise可以在Detail.vue中接收到
    return new Promise((resolve,reject) => {
      //1.查找之前数组中是否有该商品  通过context判断
      let oldProduct = context.state.cartList.find(item =>
        item.iid === payload.iid )
      //2.判断oldProduct是否有值
      if (oldProduct){
        // oldProduct.count+=1
        context.commit(ADD_COUNTER,oldProduct);
        resolve('当前商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART,payload);
        resolve('添加了新的商品');
      }
    })

    }
  }

export default actions

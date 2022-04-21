import {request} from './request'

export function getHomeMultidata() {
   return request({   //getHomeMultidata把request函数的返回值返回了,request返回的是promise
     url:'/home/multidata'  //这个接口包含轮播图数据和轮播图下面的数据
   })
}
//封装一个获取home内多个数据的函数
export function getHomeGoods(type,page){ //根据传入的type,page显示要传入的数据
  return request({
    url: '/home/data',
    params:{ //传入type,page两个数据
      type,
      page
    }
  })
}

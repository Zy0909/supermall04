import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'./detail',
    params:{
      iid
    }
  })
}
//获取推荐信息，采用新的接口
export function getRecommend(){
  return request({
    url:'./recommend'
  })
}


// 数据整合的思想:
// 当数据结构复杂，就可以把数据整合到一个class里面
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//const g= new Goods()
//g.title;

export class  Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info,rule) {
    //image 有的商品有，有的商品没有
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

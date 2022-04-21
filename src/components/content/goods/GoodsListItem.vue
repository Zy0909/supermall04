<template>
<div class="goods-item" @click="itemClick">
  <img :src="showImage" alt="" @load="imageLoad">
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,   //取出相应内容放在小对象里面
        default(){
          return {}    //先设置为空对象
        }
      }
    },
    computed:{
     showImage(){
       return this.goodsItem.image || this.goodsItem.show.img
     }
    },
    methods:{
      imageLoad(){//详情里面图片加载完毕的时候，不需要通知首页home更新
        //1.判断路由路径里面有home和detail，传出不同的事件homeItemIagLoad detailItemImgLoad
        //2.传出一样的事件
        this.$bus.$emit('itemImgLoad')
        //if(this.$route.path.indexOf('/home')){
       // this.$bus.$emit('homeItemImageLoad') }
        //else if(this.$route.path.indexOf('./detail')){
         //this.$bus.$emit('detailItemImgLoad')
       // }
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden; /*超出部分隐藏 */
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis; /*一行放不下，显示...*/
    white-space: nowrap;/*文本不进行换行*/
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{ /*收藏前面有个小图标*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

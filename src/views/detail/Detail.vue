<template>
<div id="detail"><!--导航栏比较复杂，不能直接在这里做，要封装一个模块 -->
 <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"><!--scroll里面发出scroll事件 把要滚动的区域直接放在scroll里面 必须有固定高度-->
    <!--属性：topImages 传入值：top-images -->
  <detail-swiper :top-images="topImages"></detail-swiper><!--把topImages传过去-->
  <detail-base-info :goods="goods"></detail-base-info>
  <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list><!--把拿到的recommends传给GoodsList组件中的goods-->
  </scroll>
  <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
  <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop" ></back-top>
 <!--<toast :message="message" :show="show" ></toast>-->
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";

  // import Toast from "../../components/common/toast/Toast";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail"; //传入事件
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
     // Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [], //不应该写死，应该先获取各自的offsetTop值，参数，评论，推荐 再传入这个数组
        currentIndex:0,
        isShowBackTop:false,
        //message:"",
        //show:false
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1获取顶部轮播图数据
        // console.log(res);
        const data1 = res.data.result;
        this.topImages = data1.itemInfo.topImages;
        //2获取商品信息
        this.goods = new Goods(data1.itemInfo, data1.columns, data1.shopInfo.services);
        //3创建店铺信息
        this.shop = new Shop(data1.shopInfo);
        //4保存商品详情数据
        this.detailInfo = data1.detailInfo;
        //5获取参数信息
        this.paramInfo = new GoodsParam(data1.itemParams.info, data1.itemParams.rule);
        //6获取评论信息,但有些用户没有，这里需要做一下判断
        if (data1.rate.cRate !== 0) {
          this.commentInfo = data1.rate.list[0];
        }
        //this.$nextTick( () => {//等到DetailParamsInfo全部渲染完成之后，才会回调一次下面的params函数
        //根据最新的数据，对应的DOM已经渲染出来 但是图片没有加载完，目前获取到offsetTop不包含图片，不能跳转到对应位置
        //this.themeTopYs=[];//每进来一次，都对这个新的空数组赋值
        //this.themeTopYs.push(0);
        //this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
        // })
      })
      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
    },
    mounted() {
      //获取4个title的offsetTop不能再这里面获取，可能获取不到值，等渲染好之后，才会有值
    },
    updated() {//值不对，DOM没有渲染
      //this.themeTopYs=[];//每进来一次，都对这个新的空数组赋值
      // this.themeTopYs.push(0);
      //this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //console.log(this.themeTopYs);
    },
    methods: {
     imageLoad() {
       //let newRefresh =debouce(this.$refs.scroll.refresh, 100) 节流方法，图片都加载完，只刷新一次
       //newRefresh()
       this.themeTopYs=[];//每进来一次，都对这个新的空数组赋值
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y
        this.isShowBackTop=positionY > 1000
        //2.positionY和主题中值进行对比
        //[ 0, 12664, 13952, 14169 , Number.MAX_VALUE]
        //positionY  在0和12664之间，index=0
        //12664和13952之间，index=1
        //13953和14169之间，index=2
        //大于 14169 index=3
        let length=this.themeTopYs.length
        for (let i=0;i<this.themeTopYs.length-1;i++) {//不需要遍历最后一层
          // if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1] ){
           // console.log(i);
        //}}
          // 方法1 很复杂
         //if(this.currentIndex!==i && (i<length-1&&positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1] )||// (i==length-1&&positionY>=this.themeTopYs[i])){
         // this.currentIndex=i
         // console.log(this.currentIndex);
         // this.$refs.nav.currentIndex=this.currentIndex;//使导航栏中的currengIndex等于这里的currentIndex
         // }

          //方法2 hack做法 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较
         if(this.currentIndex !==i  && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
           this.currentIndex=i;
           this.$refs.nav.currentIndex=this.currentIndex
          }
      }},
      backTop(){
        this.$refs.scroll.scroll.scrollTo(0,0,300);
      },
      addCart(){//将商品加入到购物车
       //1.获取购物车需要展示的信息，添加进去
        const product= {}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.newPrice;
        product.iid=this.iid;
        //2.将商品添加到购物车   调用action
        this.$store.dispatch('addCart',product).then( res =>{
         // this.show=true;
         // this.message=res;
         // setTimeout( () => {
         //   this.show=false;
         //   this.message=''
         // },1500)

          console.log(res)});
        //把product传进去，product在action.js中payload

      },
      titleClick(index) {
        //console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      }
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh; /* 100%视图高度 */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
  .content {
    height: calc(100% - 102px);
    background-color: #fff;
  }
</style>

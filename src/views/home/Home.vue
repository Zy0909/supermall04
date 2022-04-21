<template>
<div id="home" class="wrapper">
  <nav-bar class="home-nav"><div  slot="center">购物街</div></nav-bar>
  <scroll class="content" ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore"
          @swiperImageLoad="swiperImageLoad"><!--里面放入可滚动的内容,传入的probe-type不加冒号是字符串，Scroll.vue里面不是固定值-->
    <!--Scroll.vue内传进来了一个自定义事件，把滚动position传过来，这里监听这个事件，contentScroll是一个方法 -->
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view> <!--省略掉冒号代表传入的是字符串，带冒号传入的是数组 -->
  <feature-view></feature-view>
  <tab-control  :titles="['流行','新款','精选']"
               @tabClick="tabClick"
                ref="tabControl"></tab-control><!--只有首页需要做吸顶效果，其他页面引用TabControl不需要 -->
  <goods-list :goods="showGoods"></goods-list><!--从pop里面取出List赋值给goods --> <!--监听的是TabControl中tabClick事件 -->
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top><!-- 监听这个小组件的点击，组件不能直接监听点击事件,native可以监听组建的原生事件-->
 <!--v-show后面是true的话就显示该标签 -->
</div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"; //导入子组件
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar.vue";//导入公共组件
  import TabControl from "components/content/TabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";


  import {getHomeMultidata,getHomeGoods} from "network/home";//网络请求 /*用大括号导出是因为，导出的时候没有用default*/
  import {debounce} from 'common/utils' //引入debounce函数


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{ //保存的是首页商品数据，包括流行，新款和精选 一起请求过来
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
     console.log('home')
    },
    activated(){
      this.$refs.scroll.refresh()//刷新之后，重新计算
      this.$refs.scroll.scrollTo(0,this.saveY,0) //x不用滚动，y滚动，迅速滚动，用0秒的时间
    },
    deactivated(){//回来时
      this.saveY=this.$refs.scroll.getScrollY()
    },
    created() { /*首页创建之后发送网络请求,尽量只放一些主要逻辑，具体实现方法放到methods里面， 只要调用一下就行*/
      //1.请求多个数据
      this.getHomeMultidata(), //加了this,代表调用的是下面的方法，而不是传入的的网络请求getHomeMultidata
      //2.请求商品数据
      this.getHomeGoods('pop'),//一次性调用三次方法，分别把流行，新款和精选的第一页都请求过来
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
    },
    mounted(){//在created里面监听$bus，可能没有值
      //监听item中图片加载完成 refresh函数传入debounce函数，生成新的函数 refresh接收函数的返回值（函数）
      const refresh = debounce(this.$refs.scroll.refresh,50)//对括号里面的做一次防抖动 debounce函数已经被引入，直接调用
      //refresh()是将函数的返回值传进去，而我们要传的是函数
      this.$bus.$on('itemImageLoad', () =>{ //vue中没有$bus，要在main.js中new一个
        refresh() //调用上面的refresh
        // 会打印很多次，下面函数会执行很多次  console.log('----')
        //this.$refs.scroll.refresh()//执行这个函数之前，先等一会，弄一个定时器
      })
    },
    methods:{
      //事件监听相关方法
       tabClick(index){
         switch(index){
           case 0:
             this.currentType='pop' //上面定义的变量
             break
           case 1:
             this.currentType='new'
             break
           case 2:
             this.currentType='sell'
             break
         }},
         backClick(){
           this.$refs.scroll.scroll.scrollTo(0,0)//拿到scroll组件对象里面的scroll属性,scrollTo(0,0)方法可以回到固定位置
       },
      contentScroll(position){
        this.isShowBackTop=-(position.y)>1000 //position显示的是负值 当position大于1000，前面值变为true，v-show也为true
        this.isTabFixed=(-position.y)>this.tabOffsetTop //什么时候显示吸顶效果
      },
      loadMore(){
        this.getHomeGoods(this.currentType)//直接调用传入商品数据的方法，会自动把页码加1 ，并把当前类型传入，
      },
      swiperImageLoad(){
         //2.获取tabControl的offsetTop $el用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
      },

      //网络请求相关方法
      getHomeMultidata(){
      getHomeMultidata().then( //调用home.js封装的函数，获取url
          res => { //res会拿到请求的结果
            this.banners = res.data.data.banner.list;
            this.recommends = res.data.data.recommend.list;
          })},
      getHomeGoods(type){ //传入type,类型就可以不写死，后面可以再传入
        const page=this.goods[type].page+1//page也不要写死，做下拉操作的时候每次page要加1 goods是对象，获取对象属性是变量用[]
          getHomeGoods(type,page).then( //传入类型是pop，页码为1的商品数据
              res =>{ //res里面装得是类型为pop,page=1也就是30页的内容
              this.goods[type].list.push(...res.data.data.list)//拿到data中类型为pop的空数组，压入res中page=1中的数据内容
                this.goods[type].page+=1 //原来page=0,下次复用这个方法的时候应该使page加1
                this.$refs.scroll.finishPullUp() //4页之后还需下拉加载更多，需要调用完成下拉加载更多方法
              })
    }}
  }

</script>

<style scoped> /*scoped ,只会对当前的样式起效果*/
  #home {
   /* padding-top:44px;*/
    height: 100vh; /*百分之百视口*/
  }
.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  .content {
    height: calc(100% - 93px);/*计算属性确定content高度，算出中间高度，再距离顶部44， 也可以使用固定定位，距离上44，下49，左右0*/
    overflow:hidden;
    margin-top: 44px;
  }
</style>

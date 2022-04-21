<template>
  <div class="wrapper" ref="aaaa">
  <ul class="content">
    <button @click="btnClick">按钮</button>
    <li>1分类列表</li>
    <li>2分类列表</li>
    <li>3分类列表</li>
    <li>4分类列表</li>
    <li>5分类列表</li>
    <li>6分类列表</li>
    <li>7分类列表</li>
    <li>8分类列表</li>
    <li>9分类列表</li>
    <li>10分类列表</li>
    <li>11分类列表</li>
    <li>12分类列表</li>
    <li>13分类列表</li>
    <li>14分类列表</li>
    <li>15分类列表</li>
    <li>16分类列表</li>
    <li>17分类列表</li>
    <li>18分类列表</li>
    <li>19分类列表</li>
    <li>20分类列表</li>
    <li>21分类列表</li>
    <li>22分类列表</li>
    <li>23分类列表</li>
    <li>24分类列表</li>
    <li>25分类列表</li>
    <li>26分类列表</li>
    <li>27分类列表</li>
    <li>28分类列表</li>
    <li>29分类列表</li>
    <li>30分类列表</li>
    <li>31分类列表</li>
    <li>32分类列表</li>
    <li>33分类列表</li>
    <li>34分类列表</li>
    <li>35分类列表</li>
    <li>36分类列表</li>
    <li>37分类列表</li>
    <li>38分类列表</li>
    <li>39分类列表</li>
    <li>40分类列表</li>
    <li>41分类列表</li>
    <li>42分类列表</li>
    <li>43分类列表</li>
    <li>44分类列表</li>
    <li>45分类列表</li>
    <li>46分类列表</li>
    <li>47分类列表</li>
    <li>48分类列表</li>
    <li>49分类列表</li>
    <li>50分类列表</li>
    <li>51分类列表</li>
    <li>52分类列表</li>
    <li>53分类列表</li>
    <li>54分类列表</li>
    <li>55分类列表</li>
    <li>56分类列表</li>
    <li>57分类列表</li>
    <li>58分类列表</li>
    <li>59分类列表</li>
    <li>60分类列表</li>
    <li>61分类列表</li>
    <li>62分类列表</li>
    <li>63分类列表</li>
    <li>64分类列表</li>
    <li>65分类列表</li>
    <li>66分类列表</li>
    <li>67分类列表</li>
    <li>68分类列表</li>
    <li>69分类列表</li>
    <li>70分类列表</li>
    <li>71分类列表</li>
    <li>72分类列表</li>
    <li>73分类列表</li>
    <li>74分类列表</li>
    <li>75分类列表</li>
    <li>76分类列表</li>
    <li>77分类列表</li>
    <li>78分类列表</li>
    <li>79分类列表</li>
    <li>80分类列表</li>
    <li>81分类列表</li>
    <li>82分类列表</li>
    <li>83分类列表</li>
    <li>84分类列表</li>
    <li>85分类列表</li>
    <li>86分类列表</li>
    <li>87分类列表</li>
    <li>88分类列表</li>
    <li>89分类列表</li>
    <li>90分类列表</li>
    <li>91分类列表</li>
    <li>92分类列表</li>
    <li>93分类列表</li>
    <li>94分类列表</li>
    <li>95分类列表</li>
    <li>96分类列表</li>
    <li>97分类列表</li>
    <li>98分类列表</li>
    <li>99分类列表</li>
    <li>100分类列表</li>
  </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){//保存BScroll内部对象
      return {
       scroll:null
      }
    },
    //组件创建完之后调用生命周期函数
    create(){//new一个BScroll

    },
    mounted() {
      this.scroll=new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true

      })
      this.scroll.on('scroll',(position) =>{
        console.log(position);
      })
      this.scroll.on('pullingUp',() =>{
        console.log('上拉加载更多');
      })
    },
    methods:{
      btnClick(){
        console.log('btnClick');
      }
    }
  }
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: pink;
  /*overflow-y: scroll;在y轴上可以滚动，超出部分自动隐藏，原生局部滚动在移动端非常卡顿*/
  overflow: hidden;
}
</style>

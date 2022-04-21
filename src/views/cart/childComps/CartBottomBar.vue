<template>
  <div class="bottom-menu">
    <check-button class="select-all" :isChecked="isSelectAll" @check.native="checkBtnClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:{{ totalPrice }}</span>
    <span class="buy-product" @click="checkLength">去结算:{{ checkLength }}</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {};
  },
  methods: {
    checkClick() {
      // let isSelectAll = this.cartList.some(item => !item.checked)
      let isSelectAll = this.isSelectAll //全部都是选中，要改成全部不选中状态，否则改成全部不选中状态
      this.cartList.forEach(item => {
        isSelectAll ? item.checked = false : item.checked = true
      })
    },
    settleAccounts() {
      if (this.checkLength == 0) {
        this.$toast.show('请选择商品')
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return this.cartList.filter( item => {
        return item.checked}).reduce((preValue,item) => {
          return preValue + item.price * item.count
      },0).toFixed(2)
    },
//去计算
    checkLength() {
      return this.cartList.filter( item => {
        return item.checked
      },0).length//选中的个数
    },

    isSelectAll() {
      if (this.cartList.length === 0) { return false}
      //return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)//查找到没有选中的，find就返回，再取反 为true
    }
  }
};
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>

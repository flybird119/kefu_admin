<template>
   <div class="mini-im-order-list-component-box">
       <div style="padding:20px; font-size:13px; color: #666; text-align: center;" v-if="orders.length <= 0">{{isLoading ? '加载中...' : '暂无订单信息!'}}</div>
       <div class="order-item" :key="index" v-for="(item, index) in orders">
         <div class="order-num">业务类型:
             <em v-if="item.business_type == 1">违章代办</em>
             <em v-else-if="item.business_type == 2">罚单缴费</em>
             <em v-else-if="item.business_type == 12">车辆年审</em>
             <em v-else-if="item.business_type == 10">查违章照片</em>
             <em v-else-if="item.business_type == 11">进京证</em>
             <em v-else-if="item.business_type == 14">实物订单</em>
             <em v-else-if="item.business_type == 15">会员购买</em>
             <em v-else>未知业务类型{{item.business_type}}</em>
          </div>
         <div class="order-info">
           <span>订单编号:  <em>{{item.order_num}}</em></span>
           <span>支付金额:  <em style="color: #8bc34a">￥{{item.real_pay_num}}</em></span>
           <span>下单时间:  <em>{{$formatUnixDate(item.createtime)}}</em></span>
           <span>办理状态:  
              <em style="color:#8bc34a" v-if="item.status == 2">
                已付款
              </em>
              <em style="color:#8bc34a" v-else-if="item.status == 3">
                处理中
              </em>
              <em style="color:red" v-else-if="item.status == 5">
                已退单
              </em>
              <em style="color:#8bc34a" v-else-if="item.status == 7">
                已完成
              </em>
              <em style="color:red" v-else>
                未知状态
              </em>
          </span>
         </div>
       </div>
   </div>
</template>
<script>
import axios from "axios";
import { setTimeout } from 'timers';
export default {
  name: 'order_list',
  data(){
    return {
      orders: [],
      isLoading: false,
    }
  },
  computed: {
    user(){
      return this.$store.getters.seviceCurrentUser || {}
    }
  },
  mounted(){
    if(this.user.uid != 0){
      this.getOrders(this.user.uid)
    }
  },
  methods:{
    // 保存
    getOrders(uid) {
      if(this.isLoading) return
      this.isLoading = true
      setTimeout(()=> {
        axios
        .get("/cmp/orders/" + uid)
        .then((response) => {
          this.isLoading = false
          this.orders = response.data.data
        })
        .catch(error => {
          this.isLoading = false
          this.$message.error(error.response.data.message);
        });
      }, 1000)
    },
  },
  watch: {
    user(newUser){
      this.orders = []
      if(newUser.uid != 0){
        this.getOrders(newUser.uid)
      }
    }
  }
}
</script>
<style lang="stylus">
  .mini-im-order-list-component-box{
    height 100%
    overflow hidden
    overflow-y auto
    padding 10px 10px 50px
    box-sizing border-box
    .order-item{
      padding 10px
      border 1px solid #edf1f5
      border-radius 3px
      background-color rgba(244, 245, 247, 0.27)
      margin-bottom 10px
      .order-num{
        font-size 14px
        color #666
        em{
          color #409EFF
          font-weight 900
        }
      }
      .order-info{
        font-size 14px
        color #666
        margin-top 5px
        display flex
        flex-direction column
        justify-content space-between
        em{
          color #777
        }
      }
    }
  }
</style>

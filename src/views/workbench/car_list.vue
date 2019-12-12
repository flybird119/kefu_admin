<template>
   <div class="mini-im-car-list-component-box">
       <div style="padding:20px; font-size:13px; color: #666; text-align: center;" v-if="cars.length <= 0">{{isLoading ? '加载中...' : '暂无车辆信息!'}}</div>
       <div class="car-item" :key="item.id" v-for="item in cars">
         <div class="head">
           <div class="car-name">车牌: <em>{{item.car_num}}</em></div>
           <div class="tag">
             <span v-if="item.car_type == '01'">大车</span>
             <span v-else-if="item.car_type == '02'">小车</span>
             <span v-if="item.car_holder == 1">公司车</span>
             <span v-else-if="item.car_holder == 0">私家车</span>
           </div>
         </div>
         <div class="car-info">
           <span>违章：<em>{{item.violaton_count}}条</em></span>
           <span>罚款：<em>{{item.fine_count}}元</em></span>
           <span>扣分：<em>{{item.point_count}}分</em></span>
         </div>
       </div>
   </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'car_list',
  data(){
    return {
      cars: [],
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
      this.getCars(this.user.uid)
    }
  },
  methods:{
    // 保存
    getCars(uid) {
      if(this.isLoading) return
      this.isLoading = true
      setTimeout(()=> {
       axios
        .get("/cmp/cars/" + uid)
        .then((response) => {
          this.isLoading = false
          this.cars = response.data.data
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
      this.cars = []
      if(newUser.uid != 0){
        this.getCars(newUser.uid)
      }
    }
  }
}
</script>
<style lang="stylus">
  .mini-im-car-list-component-box{
    height 100%
    overflow hidden
    overflow-y auto
    padding 10px 10px 50px
    box-sizing border-box
    .car-item{
      padding 10px
      border 1px solid #edf1f5
      border-radius 3px
      height 60px
      background-color rgba(244, 245, 247, 0.27)
      margin-bottom 10px
      display flex
      flex-direction column
      justify-content space-around
      .head{
        display flex
        justify-content space-between
        .car-name{
          font-size 14px
          color #666
        }
        .tag{
          display flex
          justify-content flex-end
          span{
            height 20px
            padding 0 3px
            border-radius 3px
            font-size 12px
            background-color #50a6ff
            color #ffffff
            text-align center
            line-height 20px
            margin 0 3px
          }
        }
      }
      em{
        color #409EFF
      }
      .car-info{
        color #666
        font-size 14px
        margin-top 5px
        display flex
        justify-content space-between
        em{
          color #ff5722
        }
      }
    }
  }
</style>

<template>
  <el-aside width="200px" class="mini-im-aside">
      <div class="mini-im-logo" @click="$router.push({ path: '/index'})">
        <div v-if="$store.getters.systemInfo.logo"><img :src="$store.getters.systemInfo.logo + '?id=' + Date.now()" alt=""></div>
        <div v-else><img src="../assets/kefu_logo.png" alt=""></div>
      </div>
        <el-menu
          :default-active="menuActive"
          class="el-menu-vertical-demo"
          background-color="#3e444a"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b"
        >
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
          <el-menu-item index="/workbench">
           <el-badge :hidden="$store.getters.readCount == 0" :value="$store.getters.readCount" :max="99" style="width: 100%;">
            <div>
              <i class="el-icon-s-platform"></i>
              <span slot="title">工作台</span>
            </div>
            </el-badge>
          </el-menu-item>
        <el-menu-item index="/knowledge">
          <i class="el-icon-reading"></i>
          <span slot="title">知识库</span>
        </el-menu-item>
        <el-menu-item index="/robot">
          <i class="el-icon-picture-outline-round"></i>
          <span slot="title">机器人</span>
        </el-menu-item>
        <el-menu-item index="/customer">
          <i class="el-icon-headset"></i>
          <span slot="title">客服管理</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/chat_record">
          <i class="el-icon-time"></i>
          <span slot="title">服务记录</span>
        </el-menu-item>
        <el-menu-item index="/system">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
       
      </el-menu>
    </el-aside>
</template>
<script>
export default {
  name: 'mini-im-aside',
  data(){
    return {
      menuActive: "/index"
    }
  },
  mounted(){
   this.setHeaderTitle()
  },
  methods: {
    setHeaderTitle(){
      this.menuActive = this.$route.path
      var title
      switch(this.menuActive){
        case "/index":
          title = "首页"
          break
        case "/workbench":
          title = "工作台"
          break
        case "/knowledge":
          title = "知识库"
          break
        case "/robot":
          title = "机器人"
          break
        case "/customer":
          title = "客服管理"
          break
        case "/users":
          title = "用户管理"
          break
        case "/system":
          title = "系统设置"
          break
      }
      this.$store.commit("onChangeHeaserTitle", title)
    }
  },
  watch: {
    "$route"(){
     this.setHeaderTitle()
    }
  }
}
</script>
<style lang="stylus">
    .mini-im-aside{
      background-color: #3e444a
      .mini-im-logo{
        width 100%;
        height: 100px;
        display  flex
        justify-content center
        flex-direction column
        align-items center
        border-bottom 1px solid #ddd
        img{
          height : 30px
        }
      }
      .el-menu{
        border-right  0
      }
      .el-badge__content{
        border 0
        top 30px
      }
    }
</style>

export default {
    adminInfo: null,                 // 个人信息
    heaserTitle: "首页",            // header标题
    isShowAside: true,             // 控制左侧栏显示隐藏
    editDialogFormVisible: false,  // 控制修改个人资料modal
    isLogin: false,           // 是否已登录状态
    editPasswordDialogFormVisible: false, // 控制修改密码modal
    uploadToken: null,      // 上传签名数据
    platformConfig: [],     // 平台数据
    systemInfo: {},         // 系统信息
    companyInfo: {},        // 公司信息
    uploadsConfigs: [],     // 可配置上传参数
    mimcUser: null,         // mimc用户对象
    contacts: [],           // 会话列表
    robots: [],           // 机器人列表
    seviceCurrentUser: null,// 当前窗口服务谁
    messageRecord: {        // 当前聊天面板聊天消息记录
      list: []
    },
    workbenchBgColor: "#646b6f" // 工作台背景颜色
}
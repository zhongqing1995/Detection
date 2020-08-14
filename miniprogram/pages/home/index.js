var task = require('../../utils/task');
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  properties: {

  },

  data: {
    tz_list: [],
  },
  created() {
    this.list()


  },
  methods: {
 
    call() {
      wx.makePhoneCall({
        phoneNumber: '400-9669-523'
      })
    },
    tex(){
      wx.chooseInvoice()
    },
    list() {
      var prams = {
        columnid: "100740",
        page: "1"
      }
      task.postRequest("shtml?action=sendInfo", prams,
        res => {
        this.setData({
          tz_list:res.list
        })
        console.log(res.list)
        },
      )
    },
    tzxcx() {
      wx.navigateToMiniProgram({
        appId: 'wx4c0e658d4368af63',
        path: 'pages/index/index',
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
    },
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    tz2(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },

  }
})
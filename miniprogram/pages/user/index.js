var task = require('../../utils/task');
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show3: true,
    countDownNum: '1',
    list: {
      avatarUrl: "https://s1.ax1x.com/2020/07/28/aAdel6.jpg",
      nickName: "游客"
    },
    show: false,
  },

  created() {
    // this.properties.show()
    this.sq()
  },

  methods: {
    sz() {

      wx.openSetting({
        success: function (res) {}
      })

    },
    ql() {
      wx.showToast({
        title: '清理缓存成功',
        icon: 'none',
      })
      wx.clearStorage()
    },

    sq2() {
      var user = app.globalData.user
      this.setData({
        list: user
      })
    },
    countDown() {
      let that = this;
      var user = app.globalData.user
      let countDownNum = that.data.countDownNum; //获取倒计时初始值
      //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      that.setData({
        timer: setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
          //每隔一秒countDownNum就减一，实现同步
          countDownNum--;
          //然后把countDownNum存进data，好让用户知道时间在倒计着
          that.setData({
            countDownNum: countDownNum
          })
          console.log(countDownNum)
          //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
          if (countDownNum == 0) {
            that.setData({
              list: user
            })
            clearInterval(that.data.timer);

          }
          app.globalData.sydh = 2
        }, 1000)
      })
    },
    bindGetUserInfo: function (e) {
      console.log(e.detail.userInfo)
      if (e.detail.userInfo) {
        this.sq()

      } else {

      }
    },
    sq() {
      console.log('asd')
      var that2 = this
      wx.showLoading({
        title: "正在加载中...",
      })
      wx.getSetting({
        success(res) {
          wx.hideLoading();
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                that2.setData({
                  list: res.userInfo,
                  show: false,
                })
                wx.login({
                  success: res => {
  
                    wx.request({
                      url: "https://jc.tabbyedu.com/pay//api/weixin/checklogin",
                      method: 'GET',
                      data: {
                        code: res.code,
                        userInfo: that2.data.list
                      },
                      success: res => {
                        console.log(res.data)
                        var resod = JSON.parse(res.data.msg)
                        console.log(res)
                        wx.setStorageSync("openId", resod.openid);
                      },
                    });
                  }
                })
                console.log(app.globalData.user)
              }
            })
          } else {
            that2.setData({
              list: res.userInfo,
              show: true
            })
          }
        }
      })
    },

    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },

  }
})
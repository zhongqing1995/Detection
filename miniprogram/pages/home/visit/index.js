// miniprogram/pages/detection/index.js

var task = require('../../../utils/task');

Page({


  data: {
    lx: "有色金属检测",
    yh: '',
    mc: "",
    sl: "",
    zt: "",
    dd: "",
    sj: "",
    yt: "",
    bz: "",
    date: '',
    show: false,
    show2: false,
    showsq:false
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  sq(){
    task.sq()
  },
  xz2(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      yh: e.currentTarget.dataset.id,
      show2: true
    })
  },
  post() {
    var prams = {
      openid: wx.getStorageSync('openId')
    }
    task.postRequest2("protocol/show", prams,
      res => {
        if(res.flag==1){
         this.setData({
           showsq:true
         }) 
        }else{
          this.setData({
            showsq:false
          }) 
        }
        var resed = JSON.parse(res.msg)
        this.setData({
          yp_list: resed,
          yhxm: resed.contact.name || resed.user.username,
          lxdh: resed.contact.phoneno,
          dz: resed.contact.address,
        })
      },
    )
  },
  sq() {
    console.log('asd')
    var that2 = this
    wx.showLoading({
      title: "授权中",
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that2.setData({
                us_list: res.userInfo,
                show: false,
              })
              wx.login({
                success: res => {
                  console.log(res)
                  wx.request({
                    url: "https://jc.tabbyedu.com/pay//api/weixin/checklogin",
                    method: 'GET',
                    data: {
                      code: res.code,
                      userInfo: that2.data.us_list
                    },
                    success: res => {
                      wx.hideLoading();
                      var resod=JSON.parse(res.data.msg)
                      wx.setStorageSync("openId", resod.openid);
                      that2.post()
                    },
                  });
                }
              })
              console.log(app.globalData.user)
            }
          })
        } 
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.sq()

    } else {

    }
  },
  onClose() {
    this.setData({
      show: false,
      show2: false
    });
    console.log(this.data.show)
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
    console.log(this.data.date)
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  },
  xz(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      lx: e.currentTarget.dataset.id
    })
  },
  cs() {
    console.log(this.data.value)
  },



  xz3(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      jc: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.post()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
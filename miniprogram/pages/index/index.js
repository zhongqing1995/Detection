// miniprogram/pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    show3:true,
    countDownNum: '6',
    getuser:"asd",
    isTiptrue:false,
  },
  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        console.log(  countDownNum)
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
        that.setData({show3:false})
          clearInterval(that.data.timer); 
  
        }
        app.globalData.sydh=2
      }, 1000)
    })
  },
  closeThis(e){
    wx.setStorage({
      key: 'loadOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue:false
    })
  },
  tab_tz: function (e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      id: id
    })

  },
  onLoad: function (options) {
    
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              wx.startRecord()
            }
          })
        }
      }
    })
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
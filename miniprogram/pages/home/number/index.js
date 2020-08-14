var task = require('../../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url:   e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  post2(st) {
    this.setData({
      dz: wx.getStorageSync('user').address,
      xm: wx.getStorageSync('user').name,
      sjh: wx.getStorageSync('user').phoneno,
      cz:wx.getStorageSync('user').fax,
    }
  )
    var prams = {
      openid: wx.getStorageSync('openId'),
      status:5
    }
    task.postRequest2("report/list", prams,
      res => {
        this.data.jd_list=res.items
        this.setData({
          cx_list:res.items
        })
        console.log(  this.data.jd_list)
      },
    )
  },
  onLoad: function (options) {
    this.post2()

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
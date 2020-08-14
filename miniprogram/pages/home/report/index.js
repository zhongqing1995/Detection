var task = require('../../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lx: "自取",
    cx_list:[],
    dz:"湖南省长沙市芙蓉区张公岭亚大路99号",
    cz:"",
    sjh:"",
    xm:""
  },
  xz(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      lx: e.currentTarget.dataset.id
    })
  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
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
      status:st
    }
    task.postRequest2("report/list", prams,
      res => {
        this.data.jd_list=res.items
        this.setData({
          cx_list:res.items,
          
        })
        console.log(  this.data.jd_list)
      },
    )
  },
  bc(st) {
    var prams = {
      openid: wx.getStorageSync('openId'),
      sendtype:this.data.lx,
      fax:this.data.cz,
      phoneno:this.data.sjh,
      name:this.data.name,
      address:this.data.dz
    }
    task.postRequest2("protocol/complate", prams,
      res => {
        this.setData({
          cx_list: res.items
        })
        console.log(this.data.cx_list)
      },
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.post(0)
    this.post2(5)
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
var task = require('../../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    id: "",
    cx_list: [],
    tel: " ",
    vla: "",
    tl: "",
    st:2,
    count: "",
    page: 1,
    jd_list:[],
    current:1
  },
  post(st) {
    var prams = {
      openid: wx.getStorageSync('openId'),
      status:this.data.st,
      pageSize:5,
      pageNo: this.data.current

    }
    var that=this
    task.postRequest2("protocol/schedule", prams,
      res => {
        if (that.data.current> 1) {
          var a = that.data.jd_list
          var b=res.items
          a.push(...b)
          that.setData({
            jd_list: a
          })
        } else {
          this.data.jd_list=res.items
          this.setData({
            jd_list:res.items,
            totalPage:res.totalPage,
            current:res.current
          })
        }
        console.log(  this.data.jd_list)
      },
    )
  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  onChange(event) {
    var tl = event.detail.name
    this.setData({
      st:tl,
      current:1
    })
  
  this.post()
  },
  cxqr: function (e) {
    this.setData({
      vla: e.detail
    })
  },
  cx: function (id) {
    var that = this;
    wx.request({
      url: 'https://www.tabbyedu.com/api/workorder/list',
      data: {
        status: this.data.tl,
        page: this.data.page,
        rows: 5,
        tel: this.data.vla
      },
      success: function (res) {
        if (that.data.page > 1) {
          var a = that.data.cx_list
          var c = res.data.data.length
          var i = 0
          for (i; i < c; i++) {
            var b = res.data.data[i]
            a.push(b)
          }
          that.setData({
            cx_list: a
          })
          console.log(a)
        } else {
          that.setData({
            cx_list: res.data.data,
            count: Math.round(res.data.count / 5)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      st:options.id
    })

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
    var p = this.data.current + 1
    if (p <= this.data.totalPage) {
      this.setData({
        current: p
      })
      this.post()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
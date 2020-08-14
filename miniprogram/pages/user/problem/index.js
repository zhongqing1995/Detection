var task = require('../../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [0,1],
    wt_list:[],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  list() {
    var prams = {
      columnid: "100746",
      page: "1"
    }
    task.postRequest("shtml?action=sendInfo", prams,
      res => {
      this.setData({
        wt_list:res.list
      })
      console.log(res.list)
      },
    )
  },
  onLoad: function (options) {
this.list(0)
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
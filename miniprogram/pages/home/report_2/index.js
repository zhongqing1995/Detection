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
    xm:"",
    id:""
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

  post(id) {
    var prams = {
      openid: wx.getStorageSync('openId'),
      id: id
    }
    task.postRequest2("protocol/show", prams,
      res => {
        var resed = JSON.parse(res.msg)
        console.log(res)
        this.setData({
          xq_list: resed
        })

        console.log(resed)
      },
    )

  },
  post2(id) {
   
  
  var prams = {
    openid: wx.getStorageSync('openId'),
    id: id
  }
  task.postRequest2("protocol/show", prams,
    res => {
      var resed = JSON.parse(res.msg)
      console.log(res)
      this.setData({
        xq_list: resed,
        dz: resed.protocol.address,
        xm:resed.protocol.name,
        sjh: resed.protocol.phoneno,
        cz:resed.protocol.fax,
      })

      console.log(resed)
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
    this.setData({
      id: options.id
    })
    this.post2(options.id)
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
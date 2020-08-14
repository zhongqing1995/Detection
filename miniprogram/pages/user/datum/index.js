var task = require('../../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    xm:"",
    dz:"",
    lxr:"",
    dh:"",
    cz:"",
    dwmc:""
  },
  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  post() {
    var prams = {
      openid: wx.getStorageSync('openId')
    }
    task.postRequest2("protocol/show", prams,
      res => {
        var resed = JSON.parse(res.msg)
        console.log(resed.contact)
        var re=resed.contact
        wx.setStorageSync("user", resed.contact);
        this.setData({
          xm:re.name,
          dz:re.address,
          dh:re.phoneno,
         cz: re.fax,
         dwmc:re.contactname
        })
      
      },
    )
  },
  tc() {
    if (this.data.xm == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return false
    }
    if (this.data.dh == "") {
      wx.showToast({
        title: '请输入电话',
        icon: 'none',
      })
      return false
    }
    var josn = {
      contactname: this.data.dwmc,
      name:this.data.xm,
      phoneno: this.data.dh,
      contacttype:this.data.active+1,
      address: this.data.dz,
      fax: this.data.cz, 
    }
    var prams = {
      jsonstr: JSON.stringify(josn),
      openid: wx.getStorageSync('openId')
    }
    task.postRequest2("contact/save", prams,
      res => {
        if (res.flag == 0) {
          wx.showToast({
            title: '信息提交成功',
            icon: 'none',
          })
        }
      },
    )
  },
  
  onChange(event) {
    this.setData({
      active:event.detail.name
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
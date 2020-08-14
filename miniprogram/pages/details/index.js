// miniprogram/pages/details/index.js
var task = require('../../utils/task');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    deta:{},
    html:"",
  tz_list:[]

  },
top(){wx.pageScrollTo({
  scrollTop: 0,
  duration: 300
})},
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  list() {
    var prams = {
      columnid: "100740",
      page: "1",
      rows:3
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
  xq: function (id) {
    var that = this;
    wx.request({
      url: 'https://www.tabbyedu.com/shtml?action=sendInfo',
      data: {
        id: id,
      },
      success: function (res) {
        let result = res.data.list[0].content;
        const regex = new RegExp('<img', 'gi');
        result = result.replace(/<(img).*?(\/>|<\/img>|>)/g, function (s) { // 给所有img标签加上max-width:100%的限制
          if (s.indexOf('style') < 0) {
            return s.replace(/<\s*img/, '<img width="90%" height="90%"  style="max-width:100%;max-height:100%;width:90%;height:90%"');
          } else {
            return s.replace(/style=("|')/, 'style=$1=max-width:100%;max-height:100%;width:90%!important;height:90%!important;')
            . replace(/<\s*img/, '<img width="90%" height="90%"  ');
          }
        })
        .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
        .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
        .replace(/<p>/ig, '<p class="p_class">')
        console.log(result)
        that.setData({
            html: result
        });


        that.setData({
          deta:res.data.list[0],
        
        })
   

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */se() {  wx.openSetting()},
  onLoad: function (options) {
    this.list()
    this.setData({
      id:options.id
     })
     this.xq(options.id)
     wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    }); 


    

  },
  onShareTimeline: function (res) {
    if (res.from == 'button') {
  
    console.log(res.target)
    }
    return {
    title: this.data.deta.title,
    imageUrl: this.data.deta.preimage,

    }
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
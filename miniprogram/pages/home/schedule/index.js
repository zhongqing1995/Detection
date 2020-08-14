var task = require('../../../utils/task');
var md5 = require('../../../utils/md5');
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
    st:'1',
    count: "",
    page: 1,
    jd_list:[],
    current:1,
    jaj:0,
    openid: wx.getStorageSync('openId'),
  },
  jaj(e){
    var re=e.currentTarget.dataset

      var prams={
        openid: wx.getStorageSync('openId'),
        id:re.id
      }
      var that=this
      task.postRequest2("protocol/urgent", prams,
      res => {
    
        if(res.flag==0){
          that.post()  
          wx.showToast({
            title: '以收到您的加急申请,正在火速处理中',
            icon: 'none',
          })

        }


     
      })

    
    
    
  },
  zf(e){
    var re=e.currentTarget.dataset
    var prams = {
      openid: wx.getStorageSync('openId'),
      orderId:re.code,
      totalamount:re.totalamount
    }
    task.postRequest2("pay/unifiedorder", prams,
      res => {
        console.log(res.return_msg)
        if(res.return_msg=='OK'){
          var timestamp = Date.parse(new Date()).toString();;
          console.log(res.sign)
          console.log("prepay_id="+res.prepay_id)
          var stringSignTemp,  stringA, sign
          stringA="appId=wx65663ca789014a8d&nonceStr="+res.nonce_str+"&package="+'prepay_id='+res.prepay_id+"&signType=MD5&timeStamp="+timestamp;
          stringSignTemp=stringA+"&key=0110dbbd3990e7538eacd142120a9baT"
          sign=md5.md5(stringSignTemp)
          console.log(sign)
          console.log(stringA)
          wx.requestPayment({
            timeStamp:timestamp,
            nonceStr:res.nonce_str,
            package:"prepay_id="+res.prepay_id,
            signType:'MD5',
            paySign:sign,
            success (res) {
              var prams={
                out_trade_no:re.code
              }
              task.postRequest2("pay/checkStatus", prams,
              res => {
                if(res.flag==0){
                  wx.navigateTo({
                    url: "../../../pages/detection/detection-f/index"
                  })
                }
              })
              console.log(res)},
            fail (res) {console.log(res) }
          })
        }
      },
    )
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
    console.log(options.id)
  if(options.id!=undefined&&options.id!='undefined'){
    this.setData({
      st:options.id
    })
  
  }else{
    this.setData({
      st:1
    })
  
  }

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
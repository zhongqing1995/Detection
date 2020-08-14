var task = require('../../../utils/task');
var md5 = require('../../../utils/md5');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    xq_list: [],
    radio: '1',
    radio2: '1',
    radio3: '1',
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChange2(event) {
    console.log(event.detail)
    this.setData({
      radio2: event.detail,
    });
  },
  onChange3(event) {
    console.log(event.detail)
    this.setData({
      radio3: event.detail,
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

  zf(id) {
    var prams = {
      openid: wx.getStorageSync('openId'),
      orderId: this.data.xq_list.protocol.code,
      totalamount: this.data.xq_list.protocol.totalamount
    }
    task.postRequest2("pay/unifiedorder", prams,
      res => {
        console.log(res.return_msg)
        if (res.return_msg == 'OK') {
          var timestamp = Date.parse(new Date()).toString();;
          console.log(res.sign)
          console.log("prepay_id=" + res.prepay_id)
          var stringSignTemp, stringA, sign
          stringA = "appId=wx65663ca789014a8d&nonceStr=" + res.nonce_str + "&package=" + 'prepay_id=' + res.prepay_id + "&signType=MD5&timeStamp=" + timestamp;
          stringSignTemp = stringA + "&key=0110dbbd3990e7538eacd142120a9baT"
          sign = md5.md5(stringSignTemp)
          console.log(sign)
          console.log(stringA)
          wx.requestPayment({
            timeStamp: timestamp,
            nonceStr: res.nonce_str,
            package: "prepay_id=" + res.prepay_id,
            signType: 'MD5',
            paySign: sign,
            success(res) {
              var prams = {
                out_trade_no: this.data.xq_list.protocol.code
              }
              task.postRequest2("pay/unifiedorder", prams,
                res => {
                  if (res.flag == 0) {
                    wx.navigateTo({
                      url: "../../../pages/detection/detection-f/index"
                    })
                  }
                })
              console.log(res)
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      },
    )
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.post(options.id)
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
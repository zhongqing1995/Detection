

var task = require('../../../utils/task');
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    fileList: [],
    fileList2: [],
   
  },
  tz(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
  add(e) {
    console.log(this.data.conLists)
    var _list = this.data.conLists;
    var xlh = this.data.xlh.bh + 1
    var xlh2 = {
      bh: xlh
    }

    _list.push(xlh2)
    this.setData({
      conLists: _list,
      xlh: xlh2
    })
  },
  bc() {
    wx.navigateBack({
      delta: 1
    })
  
  },
  
  del(e) {
    var idx = e.currentTarget.dataset.index;
    var _list = this.data.conLists;
    console.log(idx)
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list.splice(idx, 1)
      }
    }
    this.setData({
      conLists: _list
    })
  },
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail; //当前输入的值
    var _list = this.data.conLists; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = {
          bh: val
        } //将当前输入的值放到数组中对应的位置
      }
    }
    console.log(_list)
    //  this.setData({
    //   conLists: _list
    //  })
  },
  bc() {
    var josn = {
      attchment: this.data.fileList2[0].url,
      protocolid: wx.getStorageSync('protocolid'),
    }
    console.log(josn)
    var prams = {
      jsonstr: JSON.stringify(josn),
      openid: wx.getStorageSync('openId')
    }
    task.postRequest2("protocolitem/add", prams,
      res => {
        if (res.flag == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
         
            success: function(res) {
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },1000)

            }
          })   
        }
  
      },
    )
  },

  post2(id) {
    var prams = {
      openid: wx.getStorageSync('openId'),
      id: id
    }
    var that = this
    var file = 1
    task.postRequest2("protocolitem/show", prams,
      res => {
        if(res.flag==1){
          var resed = JSON.parse(res.msg)

          var img=[{url:'http://jc.tabbyedu.com/pay/file/'+resed.protocolitem.attchment}]
          that.setData({
    
            fileList:img ,
          })
        }
   
      },
    )
  },
  de(e) {

    var url = [{
      url: ""
    }]
    this.setData({
      fileList: [],
      fileList2: [],
    })


  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    console.log(file)
    var that = this
    wx.uploadFile({
      url: 'https://jc.tabbyedu.com/pay/file/upload', // 仅为示例，非真实的接口地址
      filePath: file[0].path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        var data = JSON.parse(res.data)
        console.log(data)
        const fileList = that.data.fileList;
        const fileList2 = that.data.fileList2;
        var url = {
          url: "https://jc.tabbyedu.com/pay/file/" + data.data.finalname
        }
        var url2 = {
          url: data.data.finalname
        }
        fileList.push(url);
        fileList2.push(url2)
        that.setData({
          fileList,
          fileList2
        });
        console.log(that.data.fileList)
      },
      fail(res) {
        console.log(res)
      }
    });
  },
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
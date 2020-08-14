var task = require('../../../utils/task');
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conLists: [{
      bh: "1"
    }],
    fileList: [],
    fileList2: [{
      url: ""
    }],
    xlh: {
      bh: 1
    },
    mc: "",
    xm: "",
    qt: "",
    bh: "",
    id:""

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
        var resed = JSON.parse(res.msg)
        var data = resed.protocolitem.originalid
        var ss = data.split(",")
        var fileList2 = []
        for (let i = 0; i < ss.length; i++) {
          const fileList = {
            bh: ss[i]
          }
          fileList2.push(fileList)
        }
        console.log(resed.protocolitem)
        if(resed.protocolitem.attchment!=''){
          var img=[{url:'http://jc.tabbyedu.com/pay/file/'+resed.protocolitem.attchment}]
        }else{
          var img=[]
        }
  
  
        that.setData({
          mc: resed.protocolitem.samplename,
          conLists: fileList2,
          xm: resed.protocolitem.checkitemname,
          qt: resed.protocolitem.remark,
          fileList:img ,
        })
      },
    )
  },
  bc() {

    if (this.data.mc == "") {
      wx.showToast({
        title: '请输入样品名称',
        icon: 'none',
      })
      return false
    }

    if (this.data.xm == "") {
      wx.showToast({
        title: '请输入检测项目',
        icon: 'none',
      })
      return false
    }
    wx.showLoading({
      title: '提交中',
    })
    var bh = ""
    for (let a in this.data.conLists) {
      this.data.conLists[a].bh
      bh += this.data.conLists[a].bh + ","
    }
    bh = bh.substring(0, bh.length - 1);
    console.log(bh)
    var josn = {
      samplename: this.data.mc,
      originalid: bh,
      id:this.data.id||'',
      checkitemname: this.data.xm,
      remark: this.data.qt,
      protocolid: wx.getStorageSync('protocolid'),
      attchment: this.data.fileList2[0].url,
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
  // bc() {
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  xz(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      lx: e.currentTarget.dataset.id
    })
  },

  xz2(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      fw: e.currentTarget.dataset.id
    })
  },

  xz3(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      lb: e.currentTarget.dataset.id
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
  czxu() {
    this.setData({
      fileList: [],
      fileList2: [],
      mc: "",
      xm: "",
      qt: "",
      bh: "",
      conLists: [{
        bh: "1"
      }],
    })
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
        var url2 = [{
          url: data.data.finalname
        }]
        fileList.push(url);
      
        that.setData({
          fileList,
          fileList2:url2
        });
        console.log(that.data.fileList2)
      },
      fail(res) {
        console.log(res)
      }
    });
  },
  onLoad: function (options) {
 
    console.log( options.id)
    if(options.id!='undefined'){
      this.setData({
        id: options.id
      })
      this.post2(options.id)
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
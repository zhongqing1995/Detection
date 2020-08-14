var task = require('../../utils/task');
import Dialog from '@vant/weapp/dialog/dialog';
Component({
  data: {
    tz_list: [],
    lx:"",
    show: false,
    lb:"",
    lx:"",
    fw:"",
    yh:"",
    yp_list: "",
    dwmc:"",
    yhxm:"",
    lxdh:"",
    dz:"",
    fs:1,
    us_list:[],
    showsq:false,
    xlh: {
      bh: 1
    },
  },
  pageLifetimes: {
    show: function () {
      this.post()
    },
  },
  created() {
    this.post()

  },
  methods: {

    bindGetUserInfo: function (e) {
      console.log(e.detail.userInfo)
      if (e.detail.userInfo) {
        this.sq()

      } else {

      }
    },

    tcc() {
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
        name:this.data.yhxm,
        phoneno: this.data.lxdh,
        contacttype:this.data.yh,
        address: this.data.dz,
        fax: this.data.czx, 
      }
      var prams = {
        jsonstr: JSON.stringify(josn),
        openid: wx.getStorageSync('openId')
      }
      task.postRequest2("contact/save", prams,
        res => {
          if (res.flag == 0) {
            wx.showToast({
              title: '信息确认成功',
              icon: 'none',
            })
            this.setData({
              show:false
            })
          }
        },
      )
    },


    sq() {
      console.log('asd')
      var that2 = this
      wx.showLoading({
        title: "授权中",
      })
      wx.getSetting({
        success(res) {
  
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                that2.setData({
                  us_list: res.userInfo,
                  show: false,
                })
                wx.login({
                  success: res => {
                    console.log(res)
                    wx.request({
                      url: "https://jc.tabbyedu.com/pay/api/weixin/checklogin",
                      method: 'GET',
                      data: {
                        code: res.code,
                        userInfo: that2.data.us_list
                      },
                      success: res => {
                        wx.hideLoading();
                        var resod=JSON.parse(res.data.msg)
                        wx.setStorageSync("openId", resod.openid);
                        that2.post()
                      },
                    });
                  }
                })
                console.log(app.globalData.user)
              }
            })
          } 
        }
      })
    },

    post() {
      var prams = {
        openid: wx.getStorageSync('openId')
      }
      task.postRequest2("protocol/show", prams,
        res => {
          if(res.flag==1){
           this.setData({
             showsq:true
           }) 
          }else{
            this.setData({
              showsq:false
            }) 
          }
          var resed = JSON.parse(res.msg)
          console.log(resed.protocol.id)
          console.log(resed)
          this.data.yhxm = resed.user.username
          wx.setStorageSync("protocolid", resed.protocol.id)
          wx.setStorageSync('user',resed.contact),
          this.setData({
            yp_list: resed,
            yhxm: resed.contact.name || resed.user.username,
            lxdh: resed.contact.phoneno,
            dz: resed.contact.address,
            dwmc:resed.contact.contactname,
            czx:resed.contact.fax
          })
          console.log(this.data.dwmc)
        },
      )
    },
    xz(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        yh: e.currentTarget.dataset.id,
        show: true
      })
    },
    xz2(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        lb: e.currentTarget.dataset.id
      })
    },
    xz3(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        lx: e.currentTarget.dataset.id
      })
    },
    xz4(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        fw: e.currentTarget.dataset.id
      })
    },
    dh(){

          wx.openLocation({
            latitude:28.211680 ,
            longitude: 113.067060,
            scale: 18
          })
      
    },
    xz5(e) {
      console.log(e.currentTarget.dataset.id)
      if (e.currentTarget.dataset.id == 1) {
        // wx.openLocation({
        //   latitude:28.211680 ,
        //   longitude: 113.067060,
        //   scale: 18
        // })
      }
      this.setData({
        fs: e.currentTarget.dataset.id
      })
    },
    tjbj() {
      wx.getSetting({
        withSubscriptions: true,
        success (res) {
          console.log(res)
           res.subscriptionsSetting = {
      mainSwitch: true, 
    
    }
          wx.requestSubscribeMessage({
            tmplIds: ['PADmfPN5qxcXvsp9T06lI5tTGls9DqtWBVoT7z60MKw'],
            success (res) { console.log(res)},
            fail(res){console.log(res)}
          })
        }
      })
   
      if (this.data.lb == "") {
        wx.showToast({
          title: '请选择类别',
          icon: 'none',
        })
        return false
      }
      if (this.data.lx == "") {
        wx.showToast({
          title: '请选择检测类型',
          icon: 'none',
        })
        return false
      }
      if (this.data.fw == "") {
        wx.showToast({
          title: '请选择服务类型',
          icon: 'none',
        })
        return false
      }
      if (this.data.yh == 2) {
        if (this.data.dwmc == "") {
          wx.showToast({
            title: '请输入单位名称',
            icon: 'none',
          })
          return false
        }    
      }
      if (!(/^1[3456789]\d{9}$/.test(this.data.lxdh))) {
        wx.showToast({
          title: '请填写正确的联系手机号码',
          icon: 'none',
        })
        return false;
      }
      console.log(this.data.yp_list.length == undefined)
    
      if (this.data.yp_list.protocolitems==undefined) {
        wx.showToast({
          title: '请添加样品信息',
          icon: 'none',
        })
        return false;
      }
      if (this.data.dz == "") {
        wx.showToast({
          title: '请输入地址',
          icon: 'none',
        })
        return false
      }
      wx.showLoading({
        title: '提交中',
      })

      var josn = {
        contactname: this.data.dwmc,
        status: 1,
        name: this.data.yhxm,
        phoneno: this.data.lxdh,
        remark: this.data.bz,
        address: this.data.dz,
        checktypeid: this.data.lb,
        checktype: this.data.lx,
        sendtype: this.data.fs,
        fax: this.data.czx,
        clienttype: this.data.yh,
        servicetype: this.data.fw,
        id: wx.getStorageSync('protocolid'),
      }
      var prams = {
        jsonstr: JSON.stringify(josn),
        openid: wx.getStorageSync('openId')
      }
  
      task.postRequest2("protocol/add", prams,
        res => {
          wx.hideLoading() 
          if (res.flag == 0) {
            Dialog.confirm({
                title: '提交成功',
                message: '是否进入进度追踪',
              })
              .then(() => {
                wx.navigateTo({
                  url: "../../pages/home/schedule/index"
                })
 
              })
              .catch(() => {
                this.post()
              });

          }
        },
      )
    },
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    sc: function (e) {
      console.log(e.currentTarget.dataset.id)
      Dialog.confirm({
          message: '是否删除此条样品信息',
      
        })
        .then(() => {
          var prams = {
            id: e.currentTarget.dataset.id,
            openid: wx.getStorageSync('openId')
          }
          task.postRequest2("protocolitem/del", prams,
            res => {
              if (res.flag == 0) {
                wx.showToast({
                  title: '删除成功',
                })
                this.post()
              }
            },
          )
        })
        .catch(() => {
          // on cancel
        })
    },
    onClose() {
      this.setData({
        show: false,
      });
      wx.showToast({
        title: '您还未保存个人信息哦',
        icon: 'none',
      }) 
      this.post()
    },
    onClose2() {
      this.setData({
       
        showsq:false
      });
    },
    cloes() {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      console.log(this.data.lxdh)
      if (!myreg.test(this.data.lxdh)) {
        wx.showToast({
          title: '请填写正确的联系手机号码',
          icon: 'none',
        })
        return false;
      }
      this.setData({
        show: false
      });
    },


  }
})
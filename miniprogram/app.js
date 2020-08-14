

App({
  globalData: {
    mwxt_mark:false,//全局变量
    url:"http://www.tabbyedu.com",
    tabid:1,
    sydh:1,
    user:1
  },

task({ path , method, data }){
  var url='http://www.tabbyedu.com"'
      return new Promise((resolve, reject) => {
        wx.request({
          url: url+path,
          method: method || 'GET',
          data: data || {},
          success: res => {
            resolve(res)
            wx.setStorageSync("openId", res.data.openid);
          },
          fail: reject
        });
      });
  },
 
})





wx.checkSession({
  success () {
    console.log("身份未过期")
   
  },
  fail () {
    // session_key 已经失效，需要重新执行登录流程
 
  }
})



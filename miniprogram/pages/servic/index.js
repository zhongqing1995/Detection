
  
  var task = require('../../utils/task');
  const app = getApp()
  Component({
  
    data: {
      page:1,
      columnid:"100739"
    },
  
    created() {
      this.list()
    },

    methods: {
      onChange(event){
    
        this.setData({
          columnid:event.detail.name
        })
        this.list()
      },
      list() {
        var prams = {
          columnid: this.data.columnid,
          page: this.data.page,
          rows: 5,
        }
        var that=this
        task.postRequest("shtml?action=sendInfo", prams,
          res => {
            if (that.data.page > 1) {
              var a = that.data.xw_list
              var b=res.list
              a.push(...b)
              that.setData({
                xw_list: a
              })
  
            } else {
              console.log(res.list)
              that.setData({
                xw_list:res.list,
                count: Math.round(res.total / 5)
              })
    
            }
          console.log(this.data.xw_list)
          },
        )
      },
      jc(){
      var pag=  this.data.page
      if(pag<this.data.count){
        pag+=1
        this.setData({
          page:pag
        })
        this.list()
      }else{
        wx.showToast({
          title: '没有更多了',
          icon:"none"
        })
      }         
    },
      tz(e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
          url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
        })
      },
  
    }
  })
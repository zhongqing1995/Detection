Component({
  data: {
    selected: getApp().globalData.tabid,
    color: "#7A7E83",
    selectedColor: "#3cc51f",

  },
  attached() {
    wx.getStorage({
      key: 'ke',
      success: function (res) {
        console.log(res)
      },
    })
  },
  moved() {
    wx.getStorage({
      key: 'ke',
      success: function (res) {
        console.log(res)
      },
    })

  },
  created() {


  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const id = data.index
      const url = data.url
      getApp().globalData.tabid = id
      console.log(    getApp().globalData.tabid )
      console.log(this.data.selected)
      wx.switchTab({
        url: "../../pages/" + url + "/index"
      })

    }
  }
})
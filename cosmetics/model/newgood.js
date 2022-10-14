page({
  data:{
    allGoods:{}
  },
  onload(){
    var that =this;
  wx.request({
    url: 'http://10.60.253.65:8080/goods/findAll', //仅为示例，并非真实的接口地址
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      
      this.setData({
        allGoods : res.data 
    })
  }
})
  console.log(allGoods)
  },
})
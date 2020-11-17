//Page Object
import {request} from '../../request/index.js'
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数组
    floorList:[],
  },
  //options(Object)
  onLoad: function(options){
    //发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
     
    //   success: (res)=>{
    //     console.log(res)
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取路轮播数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(res=>{
      this.setData({
        swiperList:res.data
      })
    })
  },
  //获取分类数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(res=>{
      this.setData({
        catesList:res.data.data
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(res=>{
      this.setData({
        floorList:res.data.data
      })
    })
  },
 
});
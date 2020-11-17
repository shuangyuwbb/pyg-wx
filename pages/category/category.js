// pages/category/category.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的是菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的索引
    currentIndex:0,
    //右侧商品距顶部的距离
    scrollTop:0

  },
  //接口返回数据
  Cates:[],
  onLoad:function(options){
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      //没有数据发送请求
      this.getCates();
    }else{
      //有缓存数据 定义过期时间
      if(Date.now()-Cates.time>1000*500){
        //重新发送请求 
        this.getCates();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.name);
        let rightContent = this.Cates;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },
getCates(){
  request({
    url:"/categories"
  })
  .then(res=>{
    console.log(res)
    this.Cates = res.data.data;
    //把接口数据存入本地缓存
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //构造右侧菜单数据
    let leftMenuList = this.Cates.map(v=>v.name);
    //构造左侧商品数据
    let rightContent = this.Cates;
    this.setData({
      leftMenuList,
      rightContent
    })
  })
},
//左侧菜单点击事件
handleItemTap(e){
  const {index} = e.currentTarget.dataset
  console.log(index)
  let rightContent = this.Cates[index];
  this.setData({
    scrollTop:0,
    currentIndex:index,
    rightContent

  })
}
  
})
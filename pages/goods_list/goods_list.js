// pages/goods_list/goods_list.js
/*
  1、下拉触底
  2、判断有没有下一页数据
    1、要知道总页数
    2、要知道当前页码
  3、有数据发送请求，获取数据，渲染数据
  4、下拉刷新
    1、页面配置
    2、重置数组，重置当前页码
    3、发送请求
    4、数据请求成功，手动关闭下拉刷新等待按钮
    
 */
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    //商品列表
    goodsList:[],
   
  },
  queryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  //接口数据总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },


  //获取商品列表
  getGoodsList(){
    request({
      url:"/goods/search",
      data:this.queryParams
    })
    .then(res=>{
      let total = res.data.message.total;
      this.totalPages = Math.ceil(total / this.queryParams.pagesize),
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
    })
    //手动关闭下拉等待
    wx.stopPullDownRefresh();
  },


  //标题的点击事件  子组件传向父组件
  handleTabsItemChange(e){
    //获取被点击索引
    const {index} = e.detail;
    //修改原数组
    let {tabs} = this.data;
    
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },


  //页面上滑 触底事件
  onReachBottom(e){
    if(this.queryParams.pagenum < this.totalPages){
      //发送请求 获取数据
      this.queryParams.pagenum++;
      this.getGoodsList()
    }else{
      //
      wx.showToast({
        title: '我们是有底线的！',
      });
    }
  },

  //下拉刷新
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    }),
    //重置页码
    this.queryParams.pagenum = 1;
    //发送请求
    this.getGoodsList();
  }
  
})
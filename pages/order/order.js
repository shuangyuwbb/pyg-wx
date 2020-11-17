// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      }
      ,{
        id:3,
        value:"退货/退款",
        isActive:false
      }
    ],
  },

  onShow(options){
    //获取小程序的页面栈 数组，最多10个
    let pages =  getCurrentPages();
    //当前也就是里面最大的
    let currentPage = pages[pages.length-1]
    
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

})
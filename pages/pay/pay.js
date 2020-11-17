/**
 1、页面加载
    1、从缓存中获取购物车数据 渲染到页面中
    2、这些数据是checked=true
  2、微信支付
    1、企业账号
    2、企业账号的小程序后台中 必须给开发者添加上白名单
      1、一个appid可以同时半点多个开发者
  3、支付按钮
    1、先判断缓存中有没有token
    2、没有跳转到授权页面获取token
    3、支付

   

 */
// import {showToast} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    //从本地缓存中拿去地址
    const address = wx.getStorageSync("address");
    //获取缓存中购物车数据
    let cart = wx.getStorageSync("cart")||[];
    //过滤数组
    cart = cart.filter(v=>v.checked);

    this.setData({address});
    //计算总价格总数
    let totalPrice = 0;
    let totalNum = 0;
   
    cart.forEach(v => {
     
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      
    });
  
    //把改变的数据保存到data和缓存中
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
    wx.setStorageSync("cart", cart);

      },

  //支付功能
  handleOrderPay(){
  //1、判断缓存中有没有token
  const token = wx.getStorageSync("token");
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/auth',
      success: (result)=>{
        
      },
    });
  }else{
    console.log("已经有token了")
  }
    }


  
})
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  onShow(){
    //拿去缓存中数据
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
  },
  handleLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
      success: (result)=>{
 
      },
    });
  }
  
})
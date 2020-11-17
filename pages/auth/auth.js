// pages/auth/auth.js
import { login } from "../../utils/asyncWx.js"
import { request } from '../../request/index.js'
Page({
  data: {
    // code:'',
  },

  handleGetUserInfo(e) {
    console.log(e)
    var code1 = '';
    const { encryptedData, iv, rawData, signature } = e.detail;
    wx.login({
      timeout: 10000,
      success: (result) => {
        //通过登录拿到code
        const { code } = result;
        //封装参数
        const loginParams = { encryptedData, iv, rawData, signature, code };
        //发送请求
        request({ url: "/my/orders/create", loginParams, method: "post" })
          .then(res => {
            console.log(res)
          })
      },
    });
  }
})
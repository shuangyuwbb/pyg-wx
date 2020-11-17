/**
 获取用户收货地址
  1、添加点击事件
  2、调用api
  3、购物车数据
    1、onShow时获取缓存中的购物车数据
  4、实现全选按钮，但所有的checked=true时选中
  5、商品的总价格和总个数
    1、需要选中的我们才能计算
    2、获取购物车数组
    3、遍历
    4、把计算的结果设置到data中
  6、商品的选中
    1、绑定change事件
    2、获取改变的商品对象
    3、商品对象的状态取反
    4、把改变的商品保存到data和缓存中
    5、计算总价的总数
  7、全选和反选
    1、全选框绑定事件
    2、获取data中的allchecked变量
    3、直接取反allchecked！=allchecked
    4、遍历购物车数组让里面的商品状态跟随allchecked变化
    5、重新转入缓存
  8、商品数量的编辑
    1、绑定同一个点击事件，关键区分 自定义属性
      “+” +1
      “-” -1
    2、获取data中的购物车数组
    3、传递被点击商品的id
    4、修改商品的num
    5、setCart保存
  9、结算功能
    1、判断有没有选商品
    2、判断有没有地址
    3、两个都满足跳转到支付页面


 */
import {showToast} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
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
    const cart = wx.getStorageSync("cart")||[];
    //渲染到购物车列表
    //计算全选
    //every()会遍历 但所有的返回值为true时every返回true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setData({address})
    this.setCart(cart);
  },

  //选择地址事件
  handleChooseAdress(){
   //获取权限状态
   wx.getSetting({
     success: (result)=>{
       //获取权限  已经授权或从未点过获取地址
       const scopeAdress = result.authSetting["scope.address"];
       if(scopeAdress===true||scopeAdress===undefined){
         wx.chooseAddress({
           success: (result1)=>{
             wx.setStorageSync("address", result1);
           }
         });
       }else{
         //用户以前拒绝多授权，诱导用户打开授权设置
         wx.openSetting({
           success: (result)=>{
             wx.chooseAddress({
               success: (result)=>{
                wx.setStorageSync("address", result);
               }
             });
           }
         });
       }
     },
   });
  },

  //商品的选中
  handleItemChange(e){
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //遍历查找goods_id
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    //选中取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  //设置购物车状态的同时 计算价格总和 总数
  setCart(cart){
//计算总价格总数
let totalPrice = 0;
let totalNum = 0;
let allChecked = true;
cart.forEach(v => {
  if(v.checked){
    totalPrice += v.num * v.goods_price;
    totalNum += v.num
  }else{
    allChecked = false;
  }
});
allChecked = cart.length!=0?allChecked:false;
//把改变的数据保存到data和缓存中
this.setData({
  cart,
  totalNum,
  totalPrice,
  allChecked
})
wx.setStorageSync("cart", cart);

  },

  //全选功能
  handleItemAllchecked(){
    //获取data中的数据
    let {allChecked,cart} = this.data;
    //取反
    allChecked = !allChecked;
    //遍历
    cart.forEach(v=>v.checked = allChecked);
    //保存
    this.setCart(cart);
  },

  //商品数量编辑
  handleItemEdit(e){
    //获取点击的商品id和属性值
    const {operation,id} = e.currentTarget.dataset;
    //获取cart
    const {cart} = this.data;
    //找到被点击的索引
    let index = cart.findIndex(v=>v.goods_id===id);
    //进行判断
    if(cart[index].num===1 && operation===-1){
      wx.showModal({
        title: '提示',
        content: '确定删除吗！',
        success:(res)=> {
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart);
          } else if (res.cancel) {
            
          }
        }
      })
    }else{
//进行修改数量
cart[index].num += operation;
//保存
this.setCart(cart);
    }
    

  },

  //结算功能
  handlePay(){
    //判断地址有没有
    const {address,totalNum} = this.data;
    if(!address.userName){
      showToast({'title':'您还没有选择收货地址'});
      return;
    };
    //判断商品个数
    if(totalNum==0){
      showToast({'title':'您还没有选择商品妮'});
      return;
    };
    //跳转支付
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }
})
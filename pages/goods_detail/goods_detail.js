// pages/goods_detail/goods_detail.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  //获取商品详情信息
  getGoodsDetail(goods_id){
    request({
      url:"/goods/detail",
      data:{goods_id}
    })
    .then(res=>{
      this.GoodsInfo = res.data.message;
      console.log(this.GoodsInfo)
      this.setData({
        goodsObj:{
          goods_name: this.GoodsInfo.goods_name,
          goods_price:this.GoodsInfo.goods_price,
          //iphone部分手机不支持webp格式图片，需要转换
          //临时前端自己改，用正则
          goods_introduce:this.GoodsInfo.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:this.GoodsInfo.pics
        }    
      })
    })
  },

  //点击轮播图放大预览
  handlePrevewImage(e){
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    console.log(current)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  //点击加入购物车
  handleAddCart(){
    //1、从缓存中拿到购物车 数组
    let cart = wx.getStorageSync("cart")||[];
    //2、判断商品是否在购物车中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      //添加到购物车缓存 num++
      cart[index].num++;

    }
    //将购物车重新添加缓存中
    wx-wx.setStorageSync("cart", cart);
    //弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });

  }
})
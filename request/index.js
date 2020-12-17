//同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true,
    });
    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    // const baseUrl = "http://localhost:3000/pyg"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url : baseUrl + params.url,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
            complete: ()=>{
                ajaxTimes--;
                //当同时发送所有请求都完成再关闭
                if(ajaxTimes===0){
                    wx.hideLoading();
                } 
            }
        })
    })
}
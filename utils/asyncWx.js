/**
 *封装微信接口
 */
/**
  promise形式的getsetting */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: ()=> {
                reject(err);
            }
        });
    })
}

/**
  promise形式的chooseAddress */
  export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result);
            },
            fail: ()=> {
                reject(err);
            }
        });
    })
}
/**
  promise形式的openSetting */
  export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: ()=> {
                reject(err);
            }
        });
    })
}

/**
  promise形式的openSetting */
  export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            
        });
    })
}

/**
  promise形式的login */
  export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err)
            },
          
        });
    })
}
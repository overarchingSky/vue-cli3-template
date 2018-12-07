//配置需要用到的api
export let jsApiList = [
  "checkJsApi",
  //"onMenuShareTimeline",
  //"onMenuShareAppMessage",
  //"onMenuShareQQ",
  "chooseImage",
  "uploadImage",
  "downloadImage",
  "getLocalImgData",
  "chooseWXPay",
  "WeixinJSBridge"
];

//let timer = null;
//let limitCount = 100; //检查wx.config是否ready的最大次数
let count = 0;
export function wxInit(config) {
  //timer && clearInterval(timer);
  //let count = 0;
  ++count;
  return new Promise((resolve, reject) => {
    /* global wx */
    wx.ready(function() {
      //timer && clearInterval(timer);
      console.log("success:" + count);
      resolve();
    });
    wx.error(function(err) {
      console.log("fail", count);
      console.error("err:", err);
      //timer && clearInterval(timer);
      reject(err.errMsg);
    });
    wx.config({ jsApiList, ...config });

    // timer = setInterval(function() {
    //   ++count;
    //   wx.ready(function() {
    //     timer && clearInterval(timer);
    //     console.log("success");
    //     resolve();
    //   });
    //   wx.error(function(err) {
    //     console.error("err:", err);
    //     timer && clearInterval(timer);
    //     reject(err.errMsg);
    //   });
    //   if (count >= limitCount) {
    //     timer && clearInterval(timer);
    //     console.error("微信sdk config超时");
    //   }
    // }, 50);
  });
  // wx.config({
  //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //     appId: '', // 必填，公众号的唯一标识
  //     timestamp: , // 必填，生成签名的时间戳
  //     nonceStr: '', // 必填，生成签名的随机串
  //     signature: '',// 必填，签名
  //     jsApiList: [] // 必填，需要使用的JS接口列表
  // });
}

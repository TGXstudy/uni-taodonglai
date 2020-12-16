// wxAuthorize() {
//     let link = window.location.href;
//     let params = this._getUrlParams(link);  // 地址解析

//        // 已经授权登录过的就不用再授权了
//     if (store.state.token) return;

//     // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
//     if (params.code) {
//         api.wxAuth(params.code); // 调用后台接口，授权
//     } else {
//         let appid = 'xxx';
//         let uri = encodeURIComponent(link);
//         let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
//         window.location.href = authURL;
//     }
// }

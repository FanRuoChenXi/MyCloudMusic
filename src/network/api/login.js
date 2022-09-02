import service from "../request";
// 生成一个二维码key
export function qrCodeLoginKey(timestamp) {
  return service({
    method: "get",
    url: `/login/qr/key?timestamp=${timestamp}`,
  });
}
// 生成二维码
export function qrCodeLoginImg(key) {
  return service({
    method: "get",
    url: `/login/qr/create?qrimg=true&key=${key}`,
  });
}
// 检测二维码状态
export function qrCodeLoginCheck(key, timestamp) {
  return service({
    method: "get",
    url: `/login/qr/check?key=${key}&timestamp=${timestamp}`,
  });
}
// 获取账号信息
// export function getAccount() {
//   return service({
//     method: "get",
//     url: "/user/account",
//   });
// }
// 获取用户详情
// export function userInfo(data) {
//   return service({
//     method: "get",
//     url: `/user/detail?uid=${data}`,
//   });
// }

import service from "../request";
// 获取首页轮播图数据
export function getBanner() {
  return service({
    method: "get",
    url: "/banner?type=2",
  });
}
// 获取歌单数据
export function getMusicList() {
  return service({
    method: "get",
    url: "/personalized?limit=10",
  });
}

import service from "../request";
// 获取歌单详情页
export function getItemMusic(data) {
  return service({
    method: "get",
    url: `/playlist/detail?id=${data}`,
  });
}
// 获取歌单歌曲
export function getMusicList(data) {
  return service({
    method: "get",
    url: `/playlist/track/all?id=${data}&limit=20&offset=0`,
  });
}
// 获取歌词
export function getMusicLyric(data) {
  return service({
    method: "get",
    url: `/lyric?id=${data}`,
  });
}

import service from "../request";
// 获取搜索结果
export function getSearch(data) {
  return service({
    method: "get",
    url: `/search?keywords=${data}`,
  });
}

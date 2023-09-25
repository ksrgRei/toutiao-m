/*
 * 文章请求模块
 */
import requset from "@/utils/request";

/*
 * 请求获取文章列表数据
 */
export const getArticles = (params) => {
  return requset({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

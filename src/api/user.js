/*
 * 用户相关请求模块
 */
import request from "@/utils/request";
// import store from "@/store";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

/*
 * 发送验证码 注意：每个手机号每分钟1次
 */
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

/*
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // 发送请求头数据
    //   headers: {
    //     // 注意：该接口需要授权才能访问
    //     // token 的数据格式：Bearer token数据，注意Bearer 后面有个空格
    //     Authorization: `Bearer ${store.state.user.token}`,
    //   },
  });
};

/*
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

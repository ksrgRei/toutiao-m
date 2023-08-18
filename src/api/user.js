/*
 * 用户相关请求模块
 */
import requset from "@/utils/request";

export const login = (data) => {
  return requset({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

/*
 * 发送验证码 注意：每个手机号每分钟1次
 */
export const sendSms = (mobile) => {
  return requset({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

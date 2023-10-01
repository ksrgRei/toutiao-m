/*
 ** 频道请求模块
 */
import requset from "@/utils/request";

/*
 ** 获取所有频道列表
 */
export const getAllChannels = () => {
  return requset({
    method: "GET",
    url: "/v1_0/channels",
  });
};

/*
 ** 添加用户频道
 */
export const addUserChannel = (channel) => {
  return requset({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};

/*
 ** 删除用户指定频道
 */
export const deleteUserChannel = (channelId) => {
  return requset({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};

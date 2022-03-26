import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 使用 優惠券
  addConpon: (data) => {
    return axiosInstance.post(`/api/${apiPath}/coupon`, data);
  },
};

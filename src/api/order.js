import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 結帳
  addOrder: (data) => {
    return axiosInstance.post(`/api/${apiPath}/order`, data);
  },
  // 取得 特定訂單
  getOrder: (order_id) => {
    return axiosInstance.get(`/api/${apiPath}/order/${order_id}`);
  },
};

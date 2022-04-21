import { axiosInstance } from '../../utils/axios.js';

export default {
  login: (data) => {
    return axiosInstance.post('/admin/signin', data);
  },
};

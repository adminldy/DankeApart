import axios from "axios";
import { Toast } from 'antd-mobile'
axios.defaults.baseURL = '/api'
axios.interceptors.response.use(response => {
// Do something before response is sent
if(response.status !== 200) {
  Toast.fail('请求失败', 1);
}
return response.data;
},error => {
// Do something with response error
return Promise.reject(error);
});
export default axios
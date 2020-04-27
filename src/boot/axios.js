import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8000/'
});

export default ({ Vue }) => {
	Vue.prototype.$axios = axiosInstance;
};

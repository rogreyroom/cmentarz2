import { notifyAlert } from '../helpers/notifyAlert';

export default ({ Vue }) => {
	Vue.prototype.$notifyAlert = notifyAlert;
};

import { notifyAlert } from '../helpers/notifyAlert';
import { scrollToTheTop } from '../helpers/scrollToTop';

export default ({ Vue }) => {
	Vue.prototype.$notifyAlert = notifyAlert;
	Vue.prototype.$scrollToTheTop = scrollToTheTop;
};

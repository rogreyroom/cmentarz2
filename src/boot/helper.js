import { validateField } from '../helpers/formValidationMsg';

export default ({ Vue }) => {
	Vue.prototype.$validateField = validateField;
};

/* eslint-disable no-console */
export const validateDataAgainstSchema = (data, schema) => {
	const result = schema.validate(data, { abortEarly: true });
	return result;
};

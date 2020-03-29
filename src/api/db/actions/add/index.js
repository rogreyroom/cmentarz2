/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { db } from '../../index';

export const ADD_CEMETERY_DATA = async value => {
	return await db.asyncInsert({ doc: 'cm', thecm: value });
};

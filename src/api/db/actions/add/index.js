/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { db } from '../../index';

export const ADD_CEMETERY_DATA = async value => {
	return await db.asyncInsert({ doc: 'cm', thecm: value });
};

export const ADD_GRAVE_DATA = async value => {
	return await db.asyncInsert({ doc: 'graves', parcela: value });
};

export const ADD_TAKER_DATA = async value => {
	return await db.asyncInsert({ doc: 'takers', taker: value });
};

export const ADD_USER_DATA = async value => {
	return await db.asyncInsert({ doc: 'users', user: value });
};

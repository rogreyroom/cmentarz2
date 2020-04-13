/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { db } from '../../index';

export const REMOVE_CEMETERY_DATA = async id => {
	return await db.asyncRemove({ _id: id });
};

export const REMOVE_GRAVE_DATA = async grave => {
	return await db.asyncRemove({ 'parcela.nrGrobu': grave });
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { db } from '../../index';

export const UPDATE_CEMETERY_DATA = async (id, value) => {
	const { cmFullName, wejscie, rzad, grob } = value;
	return await db.asyncUpdate(
		{ _id: id },
		{ $set: { 'thecm.cmFullName': cmFullName, 'thecm.wejscie': wejscie, 'thecm.rzad': rzad, 'thecm.grob': grob } }
	);
};

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

export const UPDATE_GRAVE_DATA = async (id, value) => {
	const { rodzaj, status, okres, dtOplaty, dtZaplaty, ext, uwagi } = value;
	return await db.asyncUpdate(
		{ _id: id },
		{
			$set: {
				'parcela.rodzaj': rodzaj,
				'parcela.status': status,
				'parcela.okres': okres,
				'parcela.dtOplaty': dtOplaty,
				'parcela.dtZaplaty': dtZaplaty,
				'parcela.ext': ext,
				'parcela.uwagi': uwagi
			}
		}
	);
};

export const UPDATE_TAKER_DATA = async (id, value) => {
	const { imie, nazwisko, adres, email, tel, uwagi } = value;
	return await db.asyncUpdate(
		{ _id: id },
		{
			$set: {
				'taker.imie': imie,
				'taker.nazwisko': nazwisko,
				'taker.adres': adres,
				'taker.email': email,
				'taker.tel': tel,
				'taker.uwagi': uwagi
			}
		}
	);
};

export const UPDATE_USER_DATA = async (id, value) => {
	const {
		imie,
		nazwisko,
		nazwiskoRodowe,
		wiek,
		stanCywilny,
		imieMatki,
		nazwiskoMatki,
		imieOjca,
		nazwiskoOjca,
		dtUrodzenia,
		miejsceUrodzenia,
		dtZgonu,
		miejsceZgonu,
		dtPochowku,
		miejscePochowku
	} = value;
	return await db.asyncUpdate(
		{ _id: id },
		{
			$set: {
				'user.imie': imie,
				'user.nazwisko': nazwisko,
				'user.nazwiskoRodowe': nazwiskoRodowe,
				'user.wiek': wiek,
				'user.stanCywilny': stanCywilny,
				'user.imieMatki': imieMatki,
				'user.nazwiskoMatki': nazwiskoMatki,
				'user.imieOjca': imieOjca,
				'user.nazwiskoOjca': nazwiskoOjca,
				'user.dtUrodzenia': dtUrodzenia,
				'user.miejsceUrodzenia': miejsceUrodzenia,
				'user.dtZgonu': dtZgonu,
				'user.miejsceZgonu': miejsceZgonu,
				'user.dtPochowku': dtPochowku,
				'user.miejscePochowku': miejscePochowku
			}
		}
	);
};

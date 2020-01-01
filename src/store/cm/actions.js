/* eslint-disable no-console */
import db from "../../api";

// CEMETERIES
export async function FETCH_CEMETERIES({ commit }) {
  await db.find({ doc: "cm" }, (err, data) => {
    err ? console.error(err) : "";
    commit("SET_CEMETERIES", data);
  });
}

// USERS
export async function FETCH_USERS({ commit }) {
  await db.find({ doc: "users" }, (err, data) => {
    err ? console.error(err) : "";
    commit("SET_USERS", data);
  });
}

// GRAVES
export async function FETCH_GRAVES({ commit }) {
  await db.find({ doc: "graves" }, (err, data) => {
    err ? console.error(err) : "";
    commit("SET_GRAVES", data);
  });
}

// TAKERS
export async function FETCH_TAKERS({ commit }) {
  await db.find({ doc: "takers" }, (err, data) => {
    err ? console.error(err) : "";
    commit("SET_TAKERS", data);
  });
}

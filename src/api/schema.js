import Joi from "@hapi/joi";

const custErr = {
  errRequired: "pole nie może być puste",
  errNumber: "musi być numerem",
  errString: "musi być tekstem",
  errDate: "musi być datą",
  errEmail: "musi być adresem email",
  errChose: "musi zostać wybran"
};

const cmSchema = Joi.object().keys({
  cName: Joi.string()
    .required()
    .error(new Error("Numer cmentarza nie został wygenerowany " + custErr.errRequired)),
  cmFullName: Joi.string()
    .required()
    .error(new Error("Nazwa cmentarz " + custErr.errString + ", " + custErr.errRequired)),
  wejscie: Joi.string()
    .required()
    .error(new Error("Wejście cmentarza " + custErr.errChose + "e")),
  rzad: Joi.string()
    .required()
    .error(new Error("Pierwszy rząd cmentarza " + custErr.errChose + "y")),
  grob: Joi.string()
    .required()
    .error(new Error("Pierwszy grób cmentarza " + custErr.errChose + "y"))
});

const parcelaSchema = Joi.object().keys({
  nrGrobu: Joi.string().required(),
  parcela: Joi.string()
    .required()
    .error(new Error("Parcela " + custErr.errString + ", " + custErr.errRequired)),
  rzad: Joi.number()
    .integer()
    .required()
    .error(new Error("Rząd " + custErr.errNumber + ", " + custErr.errRequired)),
  grob: Joi.number()
    .integer()
    .required()
    .error(new Error("Grób " + custErr.errNumber + ", " + custErr.errRequired)),
  rodzaj: Joi.string()
    .empty("")
    .error(new Error("Rodzaj " + custErr.errString + ", " + custErr.errRequired)),
  status: Joi.string()
    .empty("")
    .error(new Error("Status " + custErr.errString + ", " + custErr.errRequired)),
  okres: Joi.number()
    .integer()
    .empty("")
    .error(new Error("Okres " + custErr.errNumber + ", " + custErr.errRequired)),
  dtOplaty: Joi.date()
    .iso()
    .empty("")
    .error(new Error("Data opłaty " + custErr.errDate + ", " + custErr.errRequired)),
  dtZaplaty: Joi.date()
    .iso()
    .empty("")
    .error(new Error("Data opłaty " + custErr.errDate + ", " + custErr.errRequired)),
  ext: Joi.string().empty(""),
  uwagi: Joi.string().empty("")
});

const parcelaEditSchema = Joi.object().keys({
  rodzaj: Joi.string()
    .empty("")
    .error(new Error("Rodzaj " + custErr.errString + ", " + custErr.errRequired)),
  status: Joi.string()
    .empty("")
    .error(new Error("Status " + custErr.errString + ", " + custErr.errRequired)),
  okres: Joi.number()
    .integer()
    .empty("")
    .error(new Error("Okres " + custErr.errNumber + ", " + custErr.errRequired)),
  dtOplaty: Joi.date()
    .iso()
    .empty("")
    .error(new Error("Data opłaty " + custErr.errDate + ", " + custErr.errRequired)),
  dtZaplaty: Joi.date()
    .iso()
    .empty("")
    .error(new Error("Data opłaty " + custErr.errDate + ", " + custErr.errRequired)),
  ext: Joi.string().empty(""),
  uwagi: Joi.string().empty("")
});

const userSchema = Joi.object().keys({
  nrGrobu: Joi.string().empty(""),
  imie: Joi.string().empty(""),
  nazwisko: Joi.string().empty(""),
  nazwiskoRodowe: Joi.string().empty(""),
  wiek: Joi.number()
    .integer()
    .empty(""),
  stanCywilny: Joi.string().empty(""),
  imieMatki: Joi.string().empty(""),
  nazwiskoMatki: Joi.string().empty(""),
  imieOjca: Joi.string().empty(""),
  nazwiskoOjca: Joi.string().empty(""),
  dtUrodzenia: Joi.date()
    .empty("")
    .error(new Error("Data urodzenia " + custErr.errDate)),
  miejsceUrodzenia: Joi.string().empty(""),
  dtZgonu: Joi.date()
    .empty("")
    .error(new Error("Data śmierci " + custErr.errDate)),
  miejsceZgonu: Joi.string().empty(""),
  dtPochowku: Joi.date()
    .empty("")
    .error(new Error("Data pochówku " + custErr.errDate)),
  miejscePochowku: Joi.string().empty("")
});

const opiekunSchema = Joi.object().keys({
  nrGrobu: Joi.string().empty(""),
  imie: Joi.string().empty(""),
  nazwisko: Joi.string().empty(""),
  adres: Joi.string().empty(""),
  tel: Joi.string().empty(""),
  email: Joi.string()
    .email({ tlds: false })
    .empty("")
    .error(new Error("Email " + custErr.errEmail)),
  uwagi: Joi.string().empty("")
});

export default {
  parcelaSchema,
  parcelaEditSchema,
  userSchema,
  opiekunSchema,
  cmSchema
};

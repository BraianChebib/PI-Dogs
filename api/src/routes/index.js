const { Router } = require("express");
const getDogs = require("./get_Dog");
const getTemperament = require("./get_Temperament");
const postDogs = require("./post_Dogs");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

mainRouter.use("/getDogs", getDogs);
mainRouter.use("/getTemperament", getTemperament);
mainRouter.use("/postDogs", postDogs);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;

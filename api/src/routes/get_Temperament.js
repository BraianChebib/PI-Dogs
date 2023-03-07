const { Router } = require("express");
const { getTemperament } = require("../handlers/getTemperament");
const router = Router();
router.get("/", getTemperament);

module.exports = router;

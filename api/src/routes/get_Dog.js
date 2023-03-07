const { Router } = require("express");
const { getIdDogs, getDogs } = require("../handlers/getDogs");
const router = Router();

router.get("/", getDogs);

router.get("/:id", getIdDogs);
module.exports = router;

const { Router } = require("express");
const { postDogs } = require("../handlers/postDogs");

const router = Router();
router.post("/", postDogs);
module.exports = router;

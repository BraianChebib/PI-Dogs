const axios = require("axios");
const {
  getDogById,
  getAllDogs,
  searchDogsByName,
} = require("../controllers/controller");

const getDogs = async (req, res) => {
  const { name } = req.query;
  const results = name ? await searchDogsByName(name) : await getAllDogs();

  res.status(200).send(results);
};

const getIdDogs = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const result = await getDogById(id, source);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getIdDogs,
  getDogs,
};

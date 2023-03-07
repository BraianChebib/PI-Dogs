const { allTemps } = require("../controllers/controller");

const getTemperament = async (req, res) => {
  try {
    const temps = await allTemps();
    res.status(200).send(temps);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getTemperament,
};

const { postDog } = require("../controllers/controller");

const postDogs = async (req, res) => {
  try {
    let { name, height, weight, life_span, image, temperament } = req.body;
    if (!name || !height || !weight) {
      res.status(404).send("Falta enviar datos obligatorios");
    }
    const postDogBdd = await postDog(
      name,
      height,
      weight,
      life_span,
      image,
      temperament
    );
    res.status(201).send(postDogBdd);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postDogs,
};

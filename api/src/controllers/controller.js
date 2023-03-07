const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");
const URL = "https://api.thedogapi.com/v1/breeds";
require("dotenv").config();
const { API_KEY } = process.env;

const getDogById = async (id, source) => {
  const res =
    source === "api"
      ? (await axios.get(`${URL}/${id}`)).data
      : await Dog.findByPk(id, {
          include: {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });

  return res;
};

// esta funcion limpia la info que trae desde la api, es decir que solo toma las propiedades que necesita
const cleanApiDogsRaw = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      temperament: elem.temperament ? elem.temperament.split(",") : [],
      image: elem.image.url,
      weight: `${elem.weight.metric} kg`,
      height: `${elem.height.metric} cm`,
      life_span: elem.life_span,
      createInDb: false, // esta propiedad va a ser util en el Front-End a la hora de filtrar los que "Dogs" que vienen desde la api o de la base de datos
    };
  });

// esta funcion devuelve todo lo de la api pasado en limpio (con solo las propiedades que necesitamos)
const apiDogsClean = async () => {
  const apiDogsRaw = (await axios.get(`${URL}?api_key=${API_KEY}`)).data; // viene la informacion "en crudo", es decir junto con las propiedades que no se necesita
  const apiDogs = cleanApiDogsRaw(apiDogsRaw);
  return apiDogs;
};

// esta funcion retorna un array con la copias de los valores que hay en la base de datos junto con lo que viene de la api
const getAllDogs = async () => {
  let databaseDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const apiDog = await apiDogsClean();
  return [...databaseDogs, ...apiDog];
};

// esta funcion convierte la primera letra en mayuscula y el resto en minuscula para hacer busqueda del nombre ingresado por query
const toUpperCase = (nombre) => {
  const palabras = nombre.split(" ");
  for (let i = 0; i < palabras.length; i++) {
    palabras[i] =
      palabras[i][0].toUpperCase() + palabras[i].substr(1).toLowerCase();
  }

  return palabras.join(" ");
};
// esta funcion busca por nombre, tanto en la base de datos como en la api
const searchDogsByName = async (name) => {
  const nam = toUpperCase(name);
  const databaseDogs = await Dog.findAll({
    where: { name: { [Op.like]: `%${nam}%` } },
  }); // falta el LIke para que la busqueda en la base de datos no sea exacata
  const apiDog = await apiDogsClean();
  const filterApi = apiDog.filter((dog) => dog.name.includes(nam)); // el includes es para que no sea una busqueda exacta en la api
  return [...filterApi, ...databaseDogs];
};

// crea una copia de los temperamentos de la api en la base de datos
const allTemps = async () => {
  const temps = await axios.get(`${URL}?api_key=${API_KEY}`); //me trae los temps en forma de arrelgo

  temps.data.forEach((elem) => {
    //analizo cada elemento del arreglo de razas
    if (elem.temperament) {
      let temps = elem.temperament.split(", ");

      temps.forEach((e) => {
        Temperament.findOrCreate({
          //analizo los arreglos, los desarmo y guardo el name de cada temp
          where: { name: e }, //findOrCreate para que no se repita cuando analice dos con el mismo name
        });
      });
    }
  });
  const findTemps = await Temperament.findAll(); //lo guardo en esta constante para no volver a hacer todo el proceso
  return findTemps; //así ya la tengo en la base de datos y la puedo sacar de ahí cuando la necesito, no hace falta volver a llamar a la api
};

// crea un perro en la base de datos
const postDog = async (name, height, weight, life_span, image, temperament) => {
  let newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
  });
  let tempsDb = await Temperament.findAll({
    //dentro del modelo Temperament(tiene todos)
    where: { name: temperament }, //encontrá todas los temps que coincidan con las props que le paso por body
  });

  newDog.addTemperament(tempsDb);
  return newDog;
};

module.exports = {
  getDogById,
  getAllDogs,
  searchDogsByName,
  postDog,
  allTemps,
};

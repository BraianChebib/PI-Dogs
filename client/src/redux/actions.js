import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const ORDER_ALFAB = "ORDER_ALFAB";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const FILTER_BY_API = "FILTER_BY_API";
export const CREATE_DOGS = "CREATE_DOGS";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_DOG = "CLEAN_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const PESO = "PESO";
const URL = "http://localhost:3001";

export const getDogs = () => {
  return async function (dispatch) {
    const dogsApiData = await axios.get(`${URL}/getDogs`);
    let dogs = dogsApiData.data;
    console.log(dogs);
    let dogInDB = dogs.filter((el) => el.createInDb === true);
    if (dogInDB.length > 0) {
      for (let i = 0; i < dogInDB.length; i++) {
        dogInDB = dogInDB?.map((temp) => {
          return {
            ...temp,
            temperament: temp.Temperaments?.map((temp) => temp.name),
          };
        });
      }
    }
    dispatch({ type: GET_DOGS, payload: dogs });
  };
};

export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/getTemperament`);
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: response.data,
    });
  };
}

export function filterDogsByTemps(payload) {
  return {
    type: FILTER_BY_TEMPS,
    payload: payload,
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    let response = await axios.get(`${URL}/getDogs?name=${name}`);
    return dispatch({
      type: GET_NAME_DOGS,
      payload: response.data, //devuelve lo de la ruta cuando le asigno un 'name'
    });
  };
}

export function filterApi(payload) {
  return {
    type: FILTER_BY_API,
    payload: payload,
  };
}

export function orderAlfab(payload) {
  return {
    type: ORDER_ALFAB,
    payload: payload,
  };
}

export function orderWeight(payload) {
  return {
    type: ORDER_WEIGHT,
    payload: payload,
  };
}

export function postDog(payload) {
  return async function () {
    const response = await axios.post(`${URL}/postDogs`, payload); //payload es todo lo que carga el usuario
    return response;
  };
}

export function altura(payload) {
  console.log(payload);
  return {
    type: PESO,
    payload: payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    let response = await axios.get(`${URL}/getDogs/${id}`);
    let dogInDB = [];
    dogInDB.push(response.data);
    dogInDB = dogInDB?.filter((el) => el.createInDb === true);
    if (dogInDB.length > 0) {
      for (let i = 0; i < dogInDB.length; i++) {
        dogInDB = dogInDB?.map((temp) => {
          return {
            ...temp,
            temperament: temp.Temperaments?.map((temp) => temp.name),
          };
        });
      }
    }
    if (response.data.reference_image_id && dogInDB.length === 0) {
      let image = await axios.get(
        `https://api.thedogapi.com/v1/images/${response.data.reference_image_id}`
      );
      return dispatch({
        type: GET_DETAIL,
        payload: { ...response.data, ...image.data },
      });
    } else {
      return dispatch({
        type: GET_DETAIL,
        payload: dogInDB[0],
      });
    }
  };
}

export const cleanDog = () => {
  return { type: "CLEAN_DOG" };
};

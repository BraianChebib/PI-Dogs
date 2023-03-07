import {
  GET_DOGS,
  GET_NAME_DOGS,
  FILTER_BY_TEMPS,
  GET_TEMPERAMENTS,
  ORDER_ALFAB,
  ORDER_WEIGHT,
  FILTER_BY_API,
  GET_DETAIL,
  CLEAN_DOG,
  PESO,
} from "./actions";

// definimos es estado global
const initialState = {
  dogs: [],
  copyAllDogs: [],
  temperament: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  const dogs = state.copyAllDogs;
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        copyAllDogs: action.payload,
        detail: action.payload,
      };

    case GET_NAME_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_BY_API:
      const apiFilt =
        action.payload === "api"
          ? dogs.filter((elem) => !elem.createInDb)
          : dogs.filter((elem) => elem.createInDb);
      return {
        ...state,
        dogs: action.payload === "all" ? dogs : apiFilt,
      };

    case FILTER_BY_TEMPS:
      const dogsTemp =
        action.payload === "all"
          ? dogs //state.copyAllDogs
          : dogs.filter((elem) => {
              return elem.temperament?.includes(action.payload);
            }); //uso la copia de todos los perros, porque este filtro se va a asignar a allDogs

      return {
        //así que si elijo otra opción va a filtrar en un allDogs ya filtrado
        ...state,
        dogs: dogsTemp,
      };
    case PESO:
      const filtro =
        action.payload === "50" ? dogs.filter((ele) => ele.height < 50) : "";
      return {
        ...state,
        dogs: filtro,
      };

    case ORDER_WEIGHT:
      const arrWei =
        action.payload === "asc"
          ? dogs.sort((a, b) => {
              let weightsA = a.weight.toString()?.split(" ");
              let weightsB = b.weight.toString()?.split(" ");
              if (weightsA[0] > weightsB[0]) return 1;
              if (weightsA[0] < weightsB[0]) return -1;
              if (weightsA[2] > weightsB[2]) return 1;
              if (weightsA[2] < weightsB[2]) return -1;
              return 0;
            })
          : dogs.sort((a, b) => {
              let weightsA = a.weight.toString()?.split(" ");
              let weightsB = b.weight.toString()?.split(" ");
              if (weightsA[0] > weightsB[0]) return -1;
              if (weightsA[0] < weightsB[0]) return 1;
              if (weightsA[2] > weightsB[2]) return -1;
              if (weightsA[2] < weightsB[2]) return 1;
              return 0;
            });

      return {
        ...state,
        dogs: arrWei,
      };

    case ORDER_ALFAB:
      const arrAlfab =
        action.payload === "AZ"
          ? dogs.sort((a, b) => {
              let prim = a.name[0].toUpperCase() + a.name.slice(1);
              let seg = b.name[0].toUpperCase() + b.name.slice(1);
              if (prim > seg) return 1;
              if (prim < seg) return -1;
              return 0;
            })
          : dogs.sort((a, b) => {
              let prim = a.name[0].toUpperCase() + a.name.slice(1);
              let seg = b.name[0].toUpperCase() + b.name.slice(1);
              if (prim > seg) return -1;
              if (prim < seg) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: arrAlfab,
      };

    case "POST_DOG":
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAN_DOG:
      return {
        ...state,
        detail: [],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;

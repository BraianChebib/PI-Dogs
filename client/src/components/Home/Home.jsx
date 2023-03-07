import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import Paginated from "../Paginated/Paginated";
import NavBar from "../../comp/NavBar/NavBar";
import {
  filterDogsByTemps,
  getTemperaments,
  getDogs,
  orderAlfab,
  orderWeight,
  filterApi,
  altura,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 8;
  const [order, setOrder] = useState("");
  const allDogs = useSelector((state) => state.dogs); //trae del reducer el state dogs con todas las razas a allDogs
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  const temperament = useSelector((state) => state.temperaments);

  const [copy, setCopy] = useState(allDogs);
  const [currentPage, setCurrentPage] = useState(0);
  const items = allDogs?.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  //guardar en un estado local la página actual y una cte que me setee la misma(arranca en 1, la 1ra)
  // const [dogsPerPage, setDogsPerPage] = useState(8);

  const nextHandler = () => {
    const totalDogs = copy.length;
    const nexPage = currentPage + 1;
    const firstIndex = nexPage * ITEMS_PER_PAGE;
    if (firstIndex === totalDogs) return;

    setCurrentPage(nexPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;

    setCurrentPage(prevPage);
  };

  const handlerClick = (e) => {
    dispatch(getDogs());
  };
  const handlerFilterApi = (e) => {
    dispatch(filterApi(e.target.value));
  };
  const handlerFilterByTemps = (e) => {
    dispatch(filterDogsByTemps(e.target.value)); //e.target.value es lo que viene del select, el payload
  };
  const handlerAltura = (e) => {
    dispatch(altura(e.target.value));
  };

  const handlerOrderWeight = (e) => {
    console.log(e.target.value);
    dispatch(orderWeight(e.target.value));
    //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`); //cuando seteo esta página, me modifica el estado local y lo modifica
  };

  const handlerOrderAlfab = (e) => {
    dispatch(orderAlfab(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <>
      <NavBar />
      <SearchBar />
      <button onClick={(e) => handlerClick(e)} className={style.btn}>
        Refresh
      </button>
      <select onChange={(e) => handlerAltura(e)}>
        <option>cualqui</option>
        <option value="50">menor a 50cm</option>
      </select>

      <select onChange={(e) => handlerFilterApi(e)} className={style.b}>
        <option hidden>sort by creation... </option>
        <option value="all">all</option>
        <option value="created">created</option>
        <option value="api">existing in the API</option>
      </select>

      <select onChange={(e) => handlerOrderWeight(e)} className={style.b}>
        <option hidden>Sort by weight...</option>
        <option value="all">All the dogs</option>
        <option value="asc">weight(lowest to highest )</option>
        <option value="desc">weight(highest to lowest)</option>
      </select>

      <select onChange={(e) => handlerOrderAlfab(e)} className={style.b}>
        <option hidden>sort alphabetically...</option>
        <option value="AZ">Order A-Z</option>
        <option value="ZA">Order Z-A</option>
      </select>

      <select onChange={(e) => handlerFilterByTemps(e)} className={style.b}>
        <option hidden>filter by temperament...</option>
        <option value="all">All</option>
        {temperament?.map((temp) => {
          //muestro todos los temperamentos como opciones
          return (
            <option value={temp.name} key={temp.id}>
              {temp.name}
            </option>
          );
        })}
      </select>
      <div>
        {allDogs && allDogs.length > 0 ? (
          <Paginated
            currentPage={currentPage}
            items={items}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        ) : (
          <span className="loader">loading...</span>
        )}
      </div>
    </>
  );
};

export default Home;

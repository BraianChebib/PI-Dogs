import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage, allDogs }) {
  const dispatch = useDispatch(); //trae del reducer el state dogs con todas las razas a allDogs

  const [name, setName] = useState("");

  const handlerInputChange = (e) => {
    setName(e.target.value); //agarro el value del input y lo seteo en el useState
  };

  const handlerButton = (e) => {
    dispatch(getNameDogs(name)); //el name va a ser mi estado local y se lo mando a la acción, para que se lo pase al back
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      dispatch(getNameDogs(name));
    }
  }

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder="Search for breeds..."
        onChange={(e) => handlerInputChange(e)}
        onKeyDown={handleKeyDown}
        className={style.input}
      />
      <button
        className={style.btn}
        type="submit"
        onClick={(e) => handlerButton(e)}
      >
        Search
      </button>
    </div>
  );
}

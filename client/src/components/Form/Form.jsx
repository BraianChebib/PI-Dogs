import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments, getDogs } from "../../redux/actions";
import style from "./Form.module.css";

const validate = (input, dogs) => {
  let errors = {};
  if (!/^[ a-zA-Z]+$/.test(input.name)) {
    errors.name =
      "Error: dato es incorrecto... Es obligatorio, no se permiten caracteres especiales, espacios números";
  }
  if (dogs?.some((e) => e.name.toUpperCase() === input.name.toUpperCase())) {
    errors.name = "Esta raza ya existe!";
  }
  if (!/^[0-9]+$/.test(input.height)) {
    errors.height =
      "Error: dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales ni letras";
  }
  if (!/^[0-9]+$/.test(input.weight)) {
    errors.weight =
      "Error:dato es incorrecto... Es obligatorio, solo números decimales, positivos, sin caracteres especiales ni letras";
  }
  if (!/^[ 0-9-]+$/.test(input.life_span)) {
    errors.life_span =
      "Error: dato es incorrecto... No se permiten caracteres especiales o letras";
  }
  if (input.image.length > 255) {
    errors.image = "la cantidad de caracter de la URL es demasiado larga";
  }
  return errors;
};

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.allDogs);

  const history = useHistory();
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handlerChange = (e) => {
    console.log("estoeee");
    console.log(input);
    setInput({
      ...input,
      [e.target.name]: e.target.value, //al 'name' de los input se los modifico con los 'value' que pase el usuario
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        dogs
      )
    );
  };

  const handlerSelectTemp = (e) => {
    setInput({ ...input, temperament: [...input.temperament, e.target.value] });
  };
  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("esto se envia en el form");
    console.log(input);
    dispatch(postDog(input));
    alert("Raza creada con éxito! Se te redirigirá al inicio...");
    setInput({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    history.push("/home"); //me manda al home
  };

  return (
    <>
      <div className={style.container}>
        <div>
          <Link to="/home">
            <button className={style.cta}>← Back</button>
          </Link>
        </div>
        <div className={style.divProd}>
          <div className={style.form}>
            <h1>Crea una Raza</h1>
            <form onSubmit={(e) => handlerSubmit(e)}>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={(e) => handlerChange(e)}
                ></input>
                {errors.name && <p className={style.errors}>{errors.name}</p>}
                <br />
                <label>Average Height (cm): </label>
                <input
                  type="number"
                  value={input.height}
                  name="height"
                  onChange={(e) => handlerChange(e)}
                  disabled={!input.name || errors.name}
                ></input>
                {errors.height && !errors.name && (
                  <p className={style.errors}>{errors.height}</p>
                )}
                <br />
                <label>Average Weight (kg): </label>
                <input
                  type="number"
                  value={input.weight}
                  name="weight"
                  onChange={(e) => handlerChange(e)}
                  disabled={!input.name || errors.height}
                ></input>
                {errors.weight && !errors.height && (
                  <p className={style.errors}>{errors.weight}</p>
                )}
                <br />
                <label>Years of Life: </label>
                <input
                  type="text"
                  value={input.life_span}
                  name="life_span"
                  onChange={(e) => handlerChange(e)}
                  disabled={!input.name || errors.weight}
                ></input>
                {errors.life_span && !errors.weight && (
                  <p className={style.errors}>{errors.life_span}</p>
                )}
                <br />
                <label>Image: </label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  alt="for sell"
                  onChange={(e) => handlerChange(e)}
                  disabled={!input.name || errors.weight}
                ></input>
                {errors.image && !errors.weight && (
                  <p className={style.errors}>{errors.image}</p>
                )}
                <br />
                <label>Temperament: </label>
                <select
                  onChange={(e) => handlerSelectTemp(e)}
                  name="temperament"
                >
                  {temperaments?.map((temp) => (
                    <option value={temp.name} key={temp.name}>
                      {temp.name}
                    </option>
                  ))}
                </select>

                <h4>Selected Temperament:</h4>
                {input.temperament.map((el) => (
                  <div key={el}>
                    <p className={style.p}>*{el}*</p>
                    <button
                      className={style.btn}
                      onClick={() => handleDelete(el)}
                    >
                      Delete
                    </button>
                  </div>
                ))}

                <button
                  type="create"
                  className={style.crear}
                  disabled={
                    !input.name || errors.name || errors.height || errors.weight
                  }
                >
                  Crear raza!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

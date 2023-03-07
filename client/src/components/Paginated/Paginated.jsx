import React from "react";
import style from "./Paginated.module.css";
import { Link } from "react-router-dom";

const paginated = (props) => {
  const items = props.items.map((item) => {
    return (
      <li key={item.id} className={style.item}>
        <img className={style.imagen} src={item.image} alt="for sell" />
        <div className={style.containerDetail}>
          <h3>
            <strong>Name: </strong>
            {item.name}
          </h3>
          <div>
            <Link to={"/detail/" + item.id} id={style.link}>
              <button className={style.btn}>DETAIL</button>
            </Link>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <ul className={style.container}>{items}</ul>
      <h3>Page: {props.currentPage}</h3>
      <div className={style.containerButton}>
        <button onClick={props.prevHandler}>prev</button>
        <button onClick={props.nextHandler}>next</button>
      </div>
    </div>
  );
};

export default paginated;

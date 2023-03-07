import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDog, getDetail } from "../../redux/actions";
import style from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dogDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id)); //accedo al id de ese perro
  }, [dispatch, id]);

  //traigo el estado detail del reducer
  return (
    <div className={style.divDet}>
      <div>
        <Link to="/home">
          <button className={style.cta} onClick={cleanDog}>
            ← Back
          </button>
        </Link>
      </div>
      <div className={style.center}>
        {Object.keys(dogDetail).length > 0 ? (
          <div className={style.container}>
            {console.log("esto es lo que llega en dogDetail")}
            {console.log(dogDetail)}
            <div className={style.info}>
              <h2 className={style.id}>
                <u>ID:</u>
                <br />
                {dogDetail.id} cm
              </h2>
              <hr />
              <h3>
                <u> Name:</u>

                <br />
                {dogDetail.name}
              </h3>
              <hr />
              <h3>
                <u> Altura Promedio:</u>
                <br />
                {dogDetail.height?.metric || dogDetail.height} cm
              </h3>
              <hr />
              <h3>
                <u> Peso Promedio:</u>
                <br /> {dogDetail.weight?.metric || dogDetail.weight} kg
              </h3>
              <hr />
              <h3>
                <u>Años de vida:</u>
                <br />
                {dogDetail.life_span}
              </h3>
              <hr />

              <h3 className={style.temperament}>
                <u>Temperamentos:</u> {dogDetail.temperament}
              </h3>
              <hr />
            </div>

            <img
              src={dogDetail.url || dogDetail.image}
              alt="for sell"
              className={style.detailPhoto}
            ></img>
          </div>
        ) : (
          <div className={style.loadingDetail}>
            <h1>Loading...</h1>
            <h3>¡Error: There is no breed with that ID!</h3>
            <h2>Please verify ID and reload the page.</h2>
            <img
              src="https://media.tenor.com/images/544920c98a38d9386cd130cba4355c3e/tenor.gif"
              alt="loading"
              width="500px"
            ></img>
          </div>
        )}
      </div>
    </div>
  );
}

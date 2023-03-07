import style from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={style.card}>
      <img src={props.image} width="100px" heigth="100px" alt="for sell" />
      <p>name:{props.name}</p>
      <p>temperament:{props.temperament}</p>
      <p>weight:{props.weight}</p>
      <p>height:{props.height}</p>
      <p>life span:{props.life_span}</p>
    </div>
  );
};

export default Card;

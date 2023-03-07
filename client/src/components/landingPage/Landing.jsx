import style from "./Landing.module.css";
const LandingPage = () => {
  return (
    <>
      <div className={style.difuminado}>
        <div className={style.container}>
          <p className={style.text}>
            ¿Cuándo fue la última vez que alguien se alegró tanto de verte, tan
            lleno de amor y afecto que literalmente corrieron a saludarte? Un
            perro lo hará por ti, diez, veinte, treinta veces al día. (Lionel
            Fisher)
          </p>
          <a href="/home">
            <button className={style.link}>
              Let's go →
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

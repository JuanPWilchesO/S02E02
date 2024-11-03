import { useState } from "react";
import { temperature } from "../../assets/images";
import CardInfo from "../CardInfo/CardInfo";
import "./CardBody.css";

function CardBody({ weather }) {

  const [toogle, setToogle] = useState(false);

  return (
    <div className="card__body">
      <div className="card__weather">
        <img src={ weather.icon } alt="icono" width={80}/>
        <CardInfo weather = {weather} />
      </div>
      <div className="card__temp">
        <img src={temperature} alt="temp-icon" width={80}/>
        { toogle ? (
          <h2 className="card__temp-temperature">{ Math.round(weather.temperature * (9/5) + 32) } °F</h2>
        ) : (
          <h2 className="card__temp-temperature">{ weather.temperature } °C</h2>
        )}
      </div>
      <button onClick={() => setToogle(!toogle)}>Change to {!toogle ? '°F' : '°C'} </button>
    </div>
  )
}

export default CardBody

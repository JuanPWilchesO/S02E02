import React from 'react'

function CardInfo({ weather }) {
  return (
    <div className="card__weather__info">
      <h3 className="card__weather__main">"{weather.main}"</h3>
      <p className="card__weather__wind-speed"><b>Wind speed:</b> {weather.windSpeed } m/s</p>
      <p className="card__weather__clouds"><b>Clouds:</b> { weather.clouds } %</p>
      <p className="card__weather__pressure"><b>Pressure:</b> { weather.pressure } hPa</p> 
    </div>
  )
}

export default CardInfo

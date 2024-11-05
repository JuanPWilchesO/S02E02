import axios from "axios";
import { useEffect, useState } from "react";
import { thunderstormSvg, drizzleSvg, rainSvg, snowSvg, atmosphereSvg, clearSvg, cloudSvg } from "./assets/images/icons";
import { thunderstormWall, drizzleWall, rainWall, snowWall, atmosphereWall, clearWall, cloudWall } from './assets/images/wallpapers';
import CardBody from "./components/CardBody/CardBody";
import './App.css';

const key = '514965591fa6eb92b1669bd08a8ef61f';

const url = 'https://api.openweathermap.org/data/2.5/weather';

const initialState = {
  latitude: 0,
  longitude: 0
};

const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  clear: clearSvg,
  atmosphere: atmosphereSvg,
  clouds: cloudSvg
};

const wallpapers = {
  thunderstorm: thunderstormWall,
  drizzle: drizzleWall,
  snow: snowWall,
  clear: clearWall,
  atmosphere: atmosphereWall,
  clouds: cloudWall
};

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804]
};

function App() {
  
  const [coords, setCoords] = useState(initialState);
  const [weather, setWeather] = useState({});
  
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((possition) => {
      const { latitude, longitude } = possition.coords;
      setCoords({ latitude, longitude });
    }, (error) => {
        console.log("Rechazó");
    });  
  }, []);
  
  useEffect(() => {
    if(coords){
      axios.get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
      .then((res) => {
        const keys = Object.keys(conditionCodes);
        const iconName = keys.find(key => conditionCodes[key].includes(res.data?.weather[0]?.id));
        const root = document.getElementById('root');
        root.style.backgroundImage = `url(${wallpapers[iconName]})`
        setWeather({
          city: res.data.name,
          country: res.data?.sys?.country,
          icon: icons[iconName],
          main: res.data?.weather[0]?.main,
          windSpeed: res.data?.wind?.speed,
          clouds: res.data?.clouds?.all,
          pressure: res.data?.main?.pressure,
          temperature: Math.round(res.data?.main?.temp - 273.15)
        });
      })
      .catch((err) => {
          console.log(err);
      });
    }
  }, [coords]);


  return (
    <div className="card">
      <h1 className="card__title">Weather App</h1>
      <h2 className="card__subtitle">{ weather.city }, { weather.country }</h2>
      <CardBody weather = { weather }/>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

const api = {
  key:"d9aa9effc317a85896152d8632673e87",
  base: "https://api.openweathermap.org/data/2.5/"
}




const dateBuilder = (d) => {
  let months=["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sept","Nov","Dec"];
  let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}
function App() {
  const [Query, setQuery] = useState('');
  const [weather, setweather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${Query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result =>{
          setweather(result);
          setQuery(''); 
          console.log(result);
        }); 
    }
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') 
        ?((weather.main.temp > 20 ) ? 
        'app warm' :'app' )
          :'app'}>

      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder = "Search..."
            onChange={e => setQuery(e.target.value)}
            value={Query}
            onKeyPress= {search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
              {Math.round(weather.main.temp)} °C
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;

import React from 'react';

const weather_codes = {
    0 : "Clear sky",
    1: "Mainly clear",
    2:"Partly cloudy",
    3 : "Overcast",
    45 : "Fog",
  61: "Slight rain",
63: "Moderate rain",
65: "Heavy rain"
} 

const WeatherCard = ({weather}) => {
// console.log(weather);
const [date, time] = weather.current.time.split("T")
  return (
    <div>
   
<div className="w-full max-w-md overflow-hidden rounded-[28px]
              bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800
              p-7 text-white shadow-2xl shadow-blue-200 mt-5">

 
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-blue-100">CURRENT WEATHER</p>
        <h1 className="mt-1 mb-1 text-2xl font-bold tracking-wide">
          {weather.city_name }
        </h1>
           <h2 className=" text-2xl font-bold tracking-wide">
          {weather.country }
        </h2>
        <h3 className="mt-1 text-sm text-blue-100">{date}</h3>
      </div>

      <div className="flex h-12 w-12 items-center justify-center
                  rounded-2xl border border-white/20 bg-white/10">
        <span className="text-2xl">📍</span>
      </div>
    </div>


    <div className="my-4 flex items-center justify-between">
      <div>
        <h2 className="text-7xl font-extralight tracking-tighter">
         {weather.current.temperature_2m}°C
        </h2>

        <p className="mt-3 text-lg font-medium"> {weather_codes[weather.current.weather_code] || "Unknown"}</p>

        <div className="mt-3 flex gap-3 text-sm text-blue-100">
          <span>↑ {weather.daily.temperature_2m_max[0]}°</span>
          <span>↓ {weather.daily.temperature_2m_min[0]}°</span>
        </div>
      </div>

      <div className="flex h-32 w-32 items-center justify-center
                  rounded-full bg-white/10 text-7xl
                  shadow-inner ring-1 ring-white/10">
        🌤️
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 rounded-2xl
                border border-white/20 bg-white/10 p-4
                backdrop-blur-md mb-5" >

      <div className="text-center">
        <span className="text-2xl">💧</span>
        <p className="mt-2 text-lg font-semibold">{weather.current.relative_humidity_2m}%</p>
        <p className="mt-1 text-xs text-blue-100">Humidity</p>
      </div>

      <div className="border-x border-white/20 text-center">
        <span className="text-2xl">💨</span>
        <p className="mt-2 text-lg font-semibold">{weather.current.wind_speed_10m} km/h</p>
        <p className="mt-1 text-xs text-blue-100">Wind Speed</p>
      </div>

      <div className="text-center">
        <span className="text-2xl">☀️</span>
        <p className="mt-2 text-lg font-semibold">5</p>
        <p className="mt-1 text-xs text-blue-100">UV Index</p>
      </div>

    </div>
    <p className=" text-center text-xs tracking-wide text-blue-100">
      Have a beautiful day ✨
    </p>

  </div>

    </div>
  )
}

export default WeatherCard

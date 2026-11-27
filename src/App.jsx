import { useState, useEffect , useRef, useCallback } from "react";
import "./App.css";
import { degreeHelper } from "./utils";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import RecentSearch from "./components/RecentSearches";

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [recent, setRecent] = useState([]);
  const [coords, setCoords] = useState(null);

const first = useRef(true);

const weatherData = useCallback(async (lat, long, name, country) => {
        const details = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
          );
          if (!details.ok) {
  throw new Error("Weather API failed");
}
   const weather_details = await details.json();
     setWeather({
  city_name: name,
  country: country,
  current: weather_details.current,
  daily: weather_details.daily,
});
   }, []);

   useEffect(() => {
  if (weather) {
    const temp = degreeHelper(
      weather.current.temperature_2m,
      unit
    );

    document.title = `${weather.city_name} — ${temp}°${unit}`;
  } else {
    document.title = "Weather Dashboard";
  }
}, [weather, unit]);
  useEffect(() => {
    let timer = setTimeout(() => {
      if (!city.trim()) {
        setError(null);
        setWeather(null); 
        setCoords(null)
        return;
      }
      async function fetchcity() {
        try {
          setLoading(true);
          setCoords(null);
          setError(null);
          setWeather(null);
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
          );

          if (!response.ok) {
  throw new Error("City search failed");
}
          const data = await response.json();
          if (!data.results) {
            throw new Error("City not Found");
          }
          const results = data.results[0];
          const lat = results.latitude;
          const long = results.longitude;
          const name = results.name;
          const country = results.country;
          setCoords({ lat, long , name , country});
     await weatherData(lat, long, name, country);
setRecent((prev) => {
const filter_recent =  prev.filter((item) =>  item !==  results.name);
return [ results.name , ...filter_recent ].slice(0, 5);
})
        } catch (err) {
          setError(err.message);
          setCoords(null)
        } finally {
          setLoading(false);
        }
      }
      fetchcity();
    }, 500);
    return () => clearTimeout(timer);
  }, [city , weatherData]);
  useEffect(() => {
  if (!coords) return;
  console.log("Interval started for:", coords.name);
  const interval = setInterval(() => {
    console.log("Refreshing weather:", coords.name);
 weatherData(
  coords.lat,
  coords.long,
  coords.name,
  coords.country
).catch((err) => {
  console.error("Auto-refresh failed:", err.message);
});
  }, 60000);
  return () => {
    console.log("Old interval cleared:", coords.name);
    clearInterval(interval);
  };
},[coords, weatherData]);
  useEffect(() => {
const get_recent= localStorage.getItem('recent');
 setRecent( JSON.parse(get_recent)  || []);
},[])

  useEffect(() => {
   if (first.current) {
      first.current = false;
      return;
    }
localStorage.setItem("recent", JSON.stringify(recent))
},[recent])

function onSelect(name){
setCity(name);
}
console.log(coords)
  return (
    <>
      <SearchBar
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setError(null);
        }}
      />

      <div>
        {loading && <p>Searching...</p>}

        {error && (
          <p className="text-center text-red-500 text-xl font-bold mt-4">
            {error}
          </p>
        )}
        {weather && <WeatherCard weather={weather } unit={unit} setUnit={setUnit} />}
        {!loading && !error && !weather && <p>Search a city</p>}
        {weather && <ForecastList weather={weather} />}
        {recent && recent.length > 0 && <RecentSearch recent={recent} onSelect={onSelect} />}
      </div>
    </>
  );
};

export default App;

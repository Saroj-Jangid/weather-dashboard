import { useState, useEffect , useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ForecastItem from "./components/ForecastItem";
import RecentSearch from "./components/RecentSearches";

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [recent, setRecent] = useState([]);

const first = useRef(true);



  useEffect(() => {
    let timer = setTimeout(() => {
      if (!city.trim()) {
        setError(null);
        setWeather(null); 
        return;
      }
      async function fetchcity() {
        try {
          setLoading(true);
          setError(null);
          setWeather(null);
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
          );
          const data = await response.json();
          if (!data.results) {
            throw new Error("City not Found");
          }
          const results = data.results[0];
          const lat = results.latitude;
          const long = results.longitude;
          const details = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
          );
          const weather_details = await details.json();
     

          setWeather(() => {
            const city_name = results.name;
            const country = results.country;
            const current = weather_details.current;
            const daily = weather_details.daily;

            return {
              city_name,
              country,
              current,
              daily,
            };
          });

setRecent((prev) => {
const filter_recent =  prev.filter((item) =>  item !==  results.name);

return [ results.name , ...filter_recent ].slice(0, 5);


})

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchcity();
    }, 500);
    return () => clearTimeout(timer);
  }, [city]);


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

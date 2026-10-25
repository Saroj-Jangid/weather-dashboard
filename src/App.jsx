import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList"; 
import ForecastItem from "./components/ForecastItem";

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);



  useEffect(() => {
     
    let timer = setTimeout(() => {
      if(!city.trim()){
        setError(null)
        setWeather(null)
        return;
      }
      async function fetchcity() {
        try {
          setLoading(true);
          setError(null)
          setWeather(null);
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
          );
            const data = await response.json();
                        if(!data.results){
                  throw new Error('City not Found');
                }

            const results = data.results[0];
            // console.log(results)
            const lat = results.latitude;
             const long = results.longitude;
        
            // console.log(results);
              // results.map((result) => {
              //   console.log(result);
              //   let long =  result.longitude;
              //   let lat = result.latitude;
              //   console.log(lat + "  and " +  long);
              // })
        
              const details = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
             const weather_details = await details.json();
             console.log(weather_details);
            
                setWeather(() =>{
                   const city_name = results.name;
                   const country =results.country;
                   const current = weather_details.current;
                   const daily = weather_details.daily;

                  //  console.log(city_name + " " + country + "current time " + current.time + " " + daily.time[0]);
                          // console.log(weather);
                            return {
    city_name,
    country,
    current,
    daily
  };
                } )
        
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

  return (
    <>
      <SearchBar
       value={city} 
       onChange={(e) =>{
        setCity(e.target.value);    
        setError(null);
        }}  />

        <div>
  {loading && <p>Searching...</p>}

  {error && (
    <p className="text-center text-red-500 text-xl font-bold mt-4">
      {error}
    </p>
  )}
{
weather && <WeatherCard weather={weather} />
}
{!loading && !error && !weather && <p>Search a city</p>}

{weather && <ForecastList weather={weather} />}


{/* {weather && <ForecastItem date={weather.daily.time} temperature_max={weather.daily.temperature_2m_max} temperature_min={weather.daily.temperature_2m_min}  />} */}

</div>
    </>
  );
};

export default App;

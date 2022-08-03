import { useState, useEffect } from 'react'
import axios from 'axios'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})
  
  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: WEATHER_API_KEY,
          q: capital,
          units: 'metric'
        }
      })
      .then(response => {
        const { data } = response
        setWeather(data)
      })
  }, [capital])

  if (!weather.main)
    return <p>No weather info available</p>
    
  return (
    <>
      <h3>Weather in {weather.name}</h3>
      <p>temperature: {weather.main.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description} icon`} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather
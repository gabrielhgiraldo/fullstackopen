import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = ({country}) => {    
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ weather, setWeather ] = useState()

    const getWindDirection = (degrees) => {
        const windDirection = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
        const index = Math.round((degrees % 360) / 22.5) + 1
        return windDirection[index]
    }

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
            setIsLoaded(true)
        })
    },[country])
    if (isLoaded){
        return (
            <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>spoken languages</h2>
            <ul>
            {country.languages.map(language => {
                return <li key={language.name}>{language.name}</li>
            })}     
            </ul>
            <img src={country.flag} width="200" alt='flag'></img>
            <h2>weather in {country.capital}</h2>
            <div><b>temperature:</b> {weather.main.temp} Celcius</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather'></img>
            <div><b>wind:</b> {weather.wind.speed} m/s direction {getWindDirection(weather.wind.deg)}</div>
        </div>
        )
    }
    else {
        return 'loading...'
    }
}

const Countries = ({countries, showCountry}) => {
    if (countries.length === 1) {
        const country = countries[0]
        return <Country country={country}></Country>
    }
    else if (countries.length <= 10) {
        return (
            countries.map(country => 
                <div key={country.name}>
                    {country.name}
                    <button onClick={() => showCountry(country.name)}>show</button>
                </div>
                
            )
        )    
    }
    else {
        return 'too many matches, specify another filter'
    }
}

export default Countries
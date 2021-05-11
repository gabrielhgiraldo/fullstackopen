import React from 'react'

const Countries = ({countries, showCountry}) => {
    if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <ul>
                {country.languages.map(language => {
                    return <li key={language.name}>{language.name}</li>
                })}     
                </ul>
                <img src={country.flag} width="200" alt='flag'></img>
            </div>
        )
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
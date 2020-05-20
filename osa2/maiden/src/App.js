import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, changeHandler}) => {
  return(<div>filter countries <input value = {filter} onChange = {changeHandler}/></div>)
}

const Weather = ({country}) => {
  //info for weather
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const url = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital

  console.log(url)

  useEffect (() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [])

  console.log(weather)
  return(
    <div>
      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
      <img src = {weather.weather_icons} alt="weather" height="150" width="150"></img>
      <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir} </p>
    </div>
  )
}

const Country = ({country}) => {
  const languages = country.languages.map(language => language.name)
  const lanList = languages.map(language =>
  <li key = {language}>{language}</li>)
  const flag = <img src={country.flag} alt="flag" height="200" width="350"></img>

  return(
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

      <h3>languages</h3>
        {lanList}

      {flag}

      <Weather country={country}/>
    </div>
  )
}

const TenCountries = ({countries, clickHandler}) => {
  return(
    countries.map(country =>
      <div key = {country.name}>
        {country.name}
        <button id={country.name} onClick = {clickHandler}>show</button>
      </div>)
  )
}

const Body = ({countries, clickHandler}) => {
  const tooMany = <div>Too many matches, specify another filter</div>

  if (countries.length > 10) {
    return(tooMany)
  } else if (countries.length === 1) {
    return(<Country country = {countries[0]}/>)
  } else {
    return(
    <TenCountries countries = {countries} clickHandler = {clickHandler}/>
    )
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  //all countries
  const [countries, setCountries] = useState([])
  //filtered countries
  const [fc, setFiltered] = useState([])

  //gets the countries from the server
  useEffect (() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const allCountries = response.data
        console.log(allCountries)
        setCountries(allCountries)
      })
  }, [])

  //filters all countries
  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    console.log(newFilter)
    setFiltered(countries.filter(country =>
      (country.name.toLowerCase()).includes(newFilter.toLowerCase())))
  }

  const handleButtonClicked = (event) => {
    console.log(event.target.id)
    setFiltered(countries.filter(country =>
      country.name === event.target.id))
  }

  console.log(fc.length)

  return(
    <div>
      <Filter filter={filter} changeHandler={handleFilterChange}/>
      <Body countries={fc} clickHandler={handleButtonClicked}/>
    </div>
  )
}

export default App;

import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [value,setValue]=useState('');
  const [country,setCountry]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState(null)

  
     useEffect(()=>{
    axios.get(`https://restcountries.com/v3.1/name/${value}`).then(response=>{
      setCountry(response.data)
      setSelectedCountry(null)
      console.log(country)
    }).catch((error)=>{
      console.log("Error",error)
    })
    
  },[value])
 
 

  const handleChange=(e)=>{
    setValue(e.target.value)
  }

  const showCountryDetails=(country)=>{
    setSelectedCountry(country)
  }

  function CountryDetails({country}){
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital:{country.capital}</p>
        <p>Area: {country.area} sq km</p>
        <p>Language:{Object.values(country.languages).join(', ')} </p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`}  />
      </div>
    )
  }

  return(
    <>
    find countries <form ><input onChange={handleChange} /></form>
   <div>{value}</div>
   <div>
     {country.length === 0 && <div>No matching countries found.</div>}
        {country.length > 10 && <div>Too many countries, please specify your search.</div>}
        {country.length <= 10 && country.length > 1 && (
          <div>
            {country.map(country => (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={()=>showCountryDetails(country)}>show</button>
                </div>
            ))}
          </div>
        )}
        {selectedCountry && <CountryDetails country={selectedCountry}/>}
   </div>
    </>
  )

}

export default App

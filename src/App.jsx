import { useEffect, useState } from 'react';
import './App.css';
import sun from './assets/suny.jpg'
import snow from './assets/snowy.jpg'
import cloud from './assets/cloudy.jpg'
import sky from './assets/clearSky.jpg'
import Description from './components/Description'
import { getFormattedWeatherData } from './weatherService';

function App() {

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState("pune")
  const[bg,setBg]=useState(sun)


  
  

  useEffect(() => {

const fetchWeatherData =async()=>{ 
  const data = await getFormattedWeatherData(city,units)
  setWeather(data)
  
  //dynamic bg
  const threshold = units === 'metric' ? 20 : 60
  if (data.temp <= threshold) setBg(snow);
  else setBg(sun)
} 
   fetchWeatherData()
  }, [units,city])
  
  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C'
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius?'metric':'imperial')
  }

  const enterPressKey = (e) => {

    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
    
  }

  return (
    <div className='app' style ={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        { /*show only weather is not null*/}
        
        {weather && 
        <div className="container">
      <div className="section section__inputs" id='container'>
     <h4>-- NTCODER --</h4>
              <input type="text" name='city' onKeyDown={enterPressKey} placeholder='Enter City' onChange={(e)=>setCity(e.target.value)}  />
        <button onClick={(e)=>handleUnitClick(e)}>°F</button>
       </div>
       
        <div className="section section__temperature">
          <div className="icon">
            <h3>{`${weather.name},${weather.country}`}</h3>
            <img src={`${weather.iconURL}`} alt="weatherIcon" />
          <h3>{`${weather.description}`} </h3>
          </div>

          <div className="temperature">
                <h1>{`${weather.temp.toFixed()}`}°{ units=='metric'?"C":"F"}</h1>
          </div>
        </div>
        {/*bottom description */}
            <Description weather={weather} units={units} />
      </div> }
    
      </div>
     
  </div>
   
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import { MyButton } from './MyButton' 
import { MyText } from './MyText' 
import { useState } from 'react';
import { MyCountries } from './MyCountries'

function getExpByCountry(country){
  console.log(country)

  if (country === "USA")
    return 45000
  
  if (country === "Israel")
    return 25000

  console.log("End")
  return 15000
}

function calculateIncome(state, set_state, value){
  set_state({
    CurrentLocation: state.CurrentLocation, 
    Destination: state.Destination,
    CurrentIncome: value,
    ForecastIncome: value - getExpByCountry(state.CurrentLocation) + getExpByCountry(state.Destination)
  })
}




function App() {
  const [state, set_state] = useState({
    CurrentLocation: "Israel", 
    Destination: "USA",
    CurrentIncome: 0,
    ForecastIncome: 0, 
  });
  
  function changeCurrentLocation(value){
    set_state({
      CurrentLocation: value, 
      Destination: state.Destination,
      CurrentIncome: state.CurrentIncome,
      ForecastIncome: state.CurrentIncome - getExpByCountry(value) + getExpByCountry(state.Destination)
    })
  }

  function changeDestination(value){
    set_state({
      CurrentLocation: state.CurrentLocation, 
      Destination: value,
      CurrentIncome: state.CurrentIncome,
      ForecastIncome: state.CurrentIncome - getExpByCountry(state.CurrentLocation) + getExpByCountry(value)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <MyCountries title="Current Location" defaultCountry={state.CurrentLocation} onChange={changeCurrentLocation}/>
        <MyCountries title="Destination" defaultCountry={state.Destination} onChange={changeDestination}/>
        <br/><br/><br/>
        <input type="text" id="fname" name="fname" value={state.CurrentIncome} onChange={ (event) => {calculateIncome(state, set_state, event.target.value)}}/><br/>
        {/* <MyButton onClick={() => set_message("John")}/>  */}
        <MyText message={state.ForecastIncome}/>
        
      </header>
    </div>
  );
}

export default App;

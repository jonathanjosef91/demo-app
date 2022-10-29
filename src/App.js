import logo from './logo.svg';
import './App.css';
import { MyButton } from './MyButton' 
import { MyText } from './MyText' 
import { useState } from 'react';
import { MyCountries } from './MyCountries'

function getVarByCountry(country){
  console.log("getExp: " , country)

  if (country === "USA")
    return 1.3
  
  if (country === "Israel")
    return 1

  console.log("End")
  return 0.9
}


function getExpByCountry(country){
  console.log("getVar: " , country)

  if (country === "USA")
    return 45000
  
  if (country === "Israel")
    return 25000

  console.log("End")
  return 15000
}

function transformIncomeZScore(originIncome, originCountry, targetCountry){
    var o_exp = getExpByCountry(originCountry)
    var t_exp = getExpByCountry(targetCountry)

    var o_var = getVarByCountry(originCountry)
    var t_var = getVarByCountry(targetCountry)

    return ((originIncome - o_exp + t_exp) * t_var ) / o_var
}

function transformIncomeExponentially(originIncome, originCountry, targetCountry){
  var o_exp = getExpByCountry(originCountry)
  var t_exp = getExpByCountry(targetCountry)

  var o_var = getVarByCountry(originCountry)
  var t_var = getVarByCountry(targetCountry)

  return ((originIncome - o_exp + t_exp) * t_var ) / o_var
}

function calculateIncome(state, set_state, value){
  set_state({
    CurrentLocation: state.CurrentLocation, 
    Destination: state.Destination,
    CurrentIncome: value,
    ForecastIncome: transformIncomeZScore(value, state.CurrentLocation, state.Destination)
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
      ForecastIncome: transformIncomeZScore(state.CurrentIncome, value, state.Destination)
    })
  }

  function changeDestination(value){
    set_state({
      CurrentLocation: state.CurrentLocation, 
      Destination: value,
      CurrentIncome: state.CurrentIncome,
      ForecastIncome:transformIncomeZScore(state.CurrentIncome, state.CurrentLocation, value)
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

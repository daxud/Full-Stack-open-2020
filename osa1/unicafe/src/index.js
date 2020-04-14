import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


/***
 * Komponentti joka vastaa statistiikan näyttämisestä
***/
const Statisctics = ({ good, bad, neutral }) => {

  if (good === 0 && bad === 0 && neutral ===0) {
    return (
      <div>
          No feedback given
      </div>
    )
  }

  // jos palautetta on annettu siirtyy suoraan tähän
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good-bad)/(good+bad+neutral)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{100*good/(good+bad+neutral) + " %"}</td>
        </tr>
      </tbody>
    </table>
  )
}

/***
 * Komponentti joka vastaa tilastoriveistä
***/
const StatiscticsLine = ({ text, value }) => (<p>{text} {value}</p>)

/***
 * Komponentti joka vastaa napeista
***/
const Button = ({ handleClick, text }) => {
  return(
    <button className = "button" onClick = {handleClick}>
      {text}
    </button>
  )
}

/***
 * Sovelluksen runko komponentti
***/
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGoodClick} text="good"/>
      <Button handleClick = {handleBadClick} text="bad"/>
      <Button handleClick = {handleNeutralClick} text="neutral"/>
      <h1>statisctics</h1>
      <Statisctics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
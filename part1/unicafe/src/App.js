import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => <tr><td>{text}</td> <td>{value}</td></tr>

const Statistics = ({good,neutral,bad}) => {
  if (good > 0 || bad > 0 || neutral > 0){
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good}></Statistic>
            <Statistic text="netural" value={neutral}></Statistic>
            <Statistic text="bad" value={bad}></Statistic>
            <Statistic text="all" value={good+neutral+bad}></Statistic>
            <Statistic text="average" value={(good - bad)/(good + neutral + bad)}></Statistic>
            <Statistic text="percentage" value={100*good/(good + neutral + bad)+'%'}></Statistic>
          </tbody>
        </table>
      </>
    )
  }
  else{
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good"></Button>
      <Button handleClick={incrementNeutral} text="neutral"></Button>
      <Button handleClick={incrementBad} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
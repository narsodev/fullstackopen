import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <li>
      {text}: {value}
    </li>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  
  if (all === 0)
    return null
  
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <ul>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive} %`} />
    </ul>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <main>
      <h1>Unicafe</h1>
      <section>
        <h2>Give feedback</h2>
        <Button
          handleClick={() => setGood(good + 1)}
          text="good" 
        />
        <Button
          handleClick={() => setNeutral(neutral + 1)}
          text="neutral"
        />
        <Button
          handleClick={() => setBad(bad + 1)}
          text="bad"
        />
      </section>
      <section>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </section>
    </main>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [renderedCountries, setRenderedCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const { data } = response
        setCountries(data)
      }) 
  }, [])

  useEffect(() => {
    const newCountries = filter === ''
      ? countries
      : countries.filter(country => {
        const name = country.name.common.toLowerCase()
        return name.includes(filter.toLowerCase())
      })
    setRenderedCountries(newCountries)
  }, [filter, countries])

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  return (
  <main>
    <Filter filter={filter} handleFilterChange={handleFilterChange} />
    <section>
      <Countries countries={renderedCountries} />
    </section>
  </main>
  )
}

export default App;

import ListedCountry from "./ListedCountry"
import SingleCountry from "./SingleCountry"

const Countries = ({ countries }) => {
  if (countries.length === 1)
    return <SingleCountry country={countries[0]} />

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>

  return countries.map(country => (
    <ListedCountry country={country} key={country.name.common} />
  ))
}

export default Countries
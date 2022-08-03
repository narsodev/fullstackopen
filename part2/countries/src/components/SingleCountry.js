const SingleCountry = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <strong>languages</strong>
    <ul>
      {
        Object.entries(country.languages)
          .map(entry => {
            const [key, value] = entry
            return <li key={key}>{value}</li>
          })
      }
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
  </div>
)

export default SingleCountry
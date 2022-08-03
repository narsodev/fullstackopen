import { useState } from 'react'
import SingleCountry from './SingleCountry'

const ListedCountry = ({ country }) => {
  const [show, setShow] = useState(false)

  const handleShowClick = () => {
    setShow(!show)
  }

  return (
    <div>
      {country.name.common}
      <button onClick={handleShowClick}>
        {
          show
            ? 'hide'
            : 'show'
        }
      </button>
      { show && <SingleCountry country={country} /> }
    </div>
  )
}

export default ListedCountry
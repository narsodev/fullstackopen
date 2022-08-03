const Filter = ({filter, handleFilterChange}) => (
  <label>
    find countries <input value={filter} onChange={handleFilterChange} />
  </label>
)

export default Filter
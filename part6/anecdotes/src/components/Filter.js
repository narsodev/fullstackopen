import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ filter, changeFilter }) => {
  const handleChange = (event) => {
    const value = event.target.value
    changeFilter(value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  filter: state.filter
})

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

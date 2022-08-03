const PersonForm = ({ handlePersonSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={handlePersonSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} required />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
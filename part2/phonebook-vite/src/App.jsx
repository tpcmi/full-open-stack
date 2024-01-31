import { useState, useEffect } from "react";
import personServices from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => { 
    console.log('effect');
    personServices.getAll(returnedData => setPersons(returnedData))
  }, [])
  
  const addName = (event) => {
    event.preventDefault();
    const existed = persons.filter((p) => p.name === newName);
    if (existed.length) {
      alert(`${newName} is existed`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personServices.addNewPerson(newPerson)
      setPersons(
        persons.concat()
      );
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  function handleNewNumber(event) {
    setNewNumber(event.target.value);
  }

  function handleFilterName(event) {
    setFilterName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={filterName} onChange={handleFilterName} />
      </div>
      <h2>add new number</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((p) => p.name.toLowerCase().includes(filterName.toLowerCase()))
        .map((p) => (
          <p key={p.name}>
            {p.name} {p.number}
          </p>
        ))}
    </div>
  );
};

export default App;

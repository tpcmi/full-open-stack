import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const dataUrlPath = "http://localhost:3001/persons"

  useEffect(() => { 
    console.log('effect');
    axios
      .get(dataUrlPath)
      .then((response) => {
        console.log("response fullfilled");
        setPersons(response.data)
      })
  },[])
  const addName = (event) => {
    event.preventDefault();
    const existed = persons.filter((p) => p.name === newName);
    if (existed.length) {
      alert(`${newName} is existed`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
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

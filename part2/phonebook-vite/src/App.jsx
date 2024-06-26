import { useState, useEffect } from "react";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then((returnedData) => {
      setPersons(returnedData);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personExisted = persons.filter((p) => p.name === newName);
    const notBlank = newName && newNumber ? true : false;
    if (!notBlank) {
      alert("Input cannot be empty");
    } else if (personExisted.length) {
      if (
        window.confirm(
          `${newName} is existed, replace the old number with a new one`
        )
      ) {
        personServices
          .updatePerson({
            name: newName,
            number: newNumber,
            id: personExisted[0].id,
          })
          .then((personData) => {
            console.log(personData);
            setPersons(
              persons.map((p) => (p.name != personData.name ? p : personData))
            );
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${newName} has already been removed`
            );
          });
      }
    } else {
      personServices
        .addNewPerson({
          name: newName,
          number: newNumber,
        })
        .then((personData) => {
          setPersons(persons.concat(personData));
          setErrorMessage(`Added ${personData.name}`);
        }).catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.error)
        });
    }
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
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

  function handleDeletePerson(id) {
    const idExisted = persons.filter((p) => p.id === id);
    if (!idExisted.length) {
      alert("Person not found");
      return;
    } else if (
      window.confirm(`Are you sure you want to delete ${idExisted[0].name}?`)
    ) {
      personServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${idExisted[0].name} has already been removed`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage !== null && <h3>{errorMessage}</h3>}
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
            {p.id}#:{p.name} {p.number}
            <button key={p.name} onClick={() => handleDeletePerson(p.id)} className="delBtn">
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default App;

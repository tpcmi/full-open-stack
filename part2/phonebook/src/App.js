import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setNewfilter] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewfilter(event.target.value);
  };

  const handleMsg = (content, color) => {
    const msgObject = {
      content: content,
      color:color
    }
    setMsg(msgObject);
    setTimeout(() => setMsg(null), 3000);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newPhone,
    };
    // 判断是否为添加过
    const notAdded = persons.reduce(
      (flag, p) => (p.name === newName ? false & flag : true & flag),
      true
    );
    // 没添加过的人
    if (notAdded) {
      personService.create(personObject).then((returnData) => {
        setPersons(persons.concat(returnData));
        handleMsg(`Added ${newName}`,'green');
        setNewName("");
        setNewPhone("");
      }).catch((err) => {
        handleMsg(err.response.data.error, 'red')
      });
    }
    // 添加过的人
    else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService
          .update(persons.find((p) => p.name === newName).id, personObject)
          .then((returnData) => {
            setPersons(
              persons.map((p) => (p.name === newName ? returnData : p))
            );
            handleMsg(`Updated ${newName} number to ${returnData.number}`,'green');
            setNewName("");
            setNewPhone("");
          }).catch((err) => {
            handleMsg(`Information of ${newName} has already been removed from server`, 'red')
            setPersons(persons.filter((p) => (p.name !== newName)));
          });
      }
    }
  };

  const nameToShow = persons.filter((p) =>
    p.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );

  const deleteCurPerson = (id) => {
    if (window.confirm(`Delete ${persons.find((n) => n.id === id).name} ?`)) {
      personService.deletePerson(id).catch((err) => {
        handleMsg(`Information of ${newName} has already been removed from server`, 'red')
        setPersons(persons.filter((p) => (p.name !== newName)));
      });
      setPersons(persons.filter((p) => (p.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
      <Filter filterName={filterName} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleNewPerson={handleNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h3>Numbers</h3>
      {nameToShow.map((p) => (
        <Persons
          onePersonInfo={p}
          key={p.id}
          deleteCurPerson={() => deleteCurPerson(p.id)}
        />
      ))}
    </div>
  );
};

export default App;

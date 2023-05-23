import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios"

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [filterName, setNewfilter] = useState("");

    axios.get("http://localhost:3001/persons").then(res => {
        console.log(res);
    })

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };

    const handleNewPhone = (event) => {
        setNewPhone(event.target.value);
    };

    const handleNewFilter = (event) => {
        setNewfilter(event.target.value);
    };

    const handleNewPerson = (event) => {
        event.preventDefault();
        const isAdded = persons.reduce(
            (flag, p) => (p.name === newName ? true : false),
            false
        );

        if (isAdded) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const personObject = {
                name: newName,
                id: persons.length + 1,
                phone: newPhone,
            };
            setPersons(persons.concat(personObject));
            setNewName("");
            setNewPhone("");
        }
    };

    const nameToShow = persons.filter((p) => {
        if (p.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    });

    return (
        <div>
            <h2>Phonebook</h2>
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
            <Persons nameToShow={nameToShow} />
        </div>
    );
};

export default App;

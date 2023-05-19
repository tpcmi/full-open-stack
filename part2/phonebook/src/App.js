import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phone: "040-123456", id: 1 },
        { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [filterName, setNewfilter] = useState("");

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
        <Filter/>
            filter shown with
            <input value={filterName} onChange={handleNewFilter} />
        <h3>Add a new</h3>
        <PersonForm/>
            <form onSubmit={handleNewPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number: <input value={newPhone} onChange={handleNewPhone} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        <h3>Numbers</h3>
        <Persons/>
            {nameToShow.map((p) => (
                <p key={p.id}>
                    {p.name} {p.phone}
                </p>
            ))}
        </div>
    );
};

export default App;

const PersonForm = ({
    handleNewPerson,
    newName,
    handleNewName,
    newPhone,
    handleNewPhone,
}) => (
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
);

export default PersonForm
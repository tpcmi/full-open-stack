const Persons = ({ onePersonInfo, deleteCurPerson }) => (
  <div>
        {onePersonInfo.name} {onePersonInfo.number}
        <button onClick={deleteCurPerson}>delete</button>
  </div>
);

export default Persons;
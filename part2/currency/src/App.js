import { useState } from "react";
import axios from "axios";

const Input = ({ handleSubmit, value, handleValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      currency:
      <input value={value} onChange={handleValue} />
      <button type="submit">exchange rate</button>
    </form>
  );
};

const Content = ({ cont }) => {
  if (Object.keys(cont) === 0) {
    return null;
  }
  return (
    <>
      {Object.keys(cont).map((c) => (
        <p key={c}>
          {c}: {cont[c]}
        </p>
      ))}
    </>
  );
};
const App = () => {
  const [value, setValue] = useState("");
  const [cont, setCont] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const apiKey = process.env.REACT_APP_API;
    const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;
    axios.get(`${baseUrl}/${value}`).then((res) => {
      setCont(res.data.conversion_rates);
    });
  };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Input
        handleSubmit={handleSubmit}
        value={value}
        handleValue={handleValue}
      />
      <Content cont={cont} />
    </div>
  );
};

export default App;

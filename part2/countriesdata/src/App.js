import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Content from "./components/Content";

const App = () => {
  const [newCountry, setNewCountry] = useState("");
  const [info, setInfo] = useState([]);
  const timer = useRef(null);

  const handleNewCountry = (event) => {
    setNewCountry(event.target.value);
  };

  const handleEffect = (newCountry, timer) => {
    timer.current = Date.now();
    // 这是一个深拷贝，所以每次timer.current变换都不会引起triggerTime跟着变化
    const triggerTime = timer.current;
    axios
      .get(`https://restcountries.com/v3.1/name/${newCountry}`)
      .then((res) => {
        console.log(newCountry,triggerTime,timer.current);
        if (triggerTime === timer.current) {
          setInfo(res.data);
        }
      })
      .catch((err) => {
        console.log("wait for input");
        setInfo([]);
      });
  };

  useEffect(() => {
    handleEffect(newCountry, timer);
  }, [newCountry]);

  return (
    <>
      <Filter newCountry={newCountry} handleNewCountry={handleNewCountry} />
      <Content info={info}/>
    </>
  );
};

export default App;

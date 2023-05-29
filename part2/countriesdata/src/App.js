import { useState, useEffect, useRef } from "react";

import Filter from "./components/Filter";
import Content from "./components/Content";
import countryService from "./services/country";

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
    if (newCountry !== "") {
      countryService.getCountry(newCountry).then((countriesData) => {
        if (triggerTime === timer.current) {
          setInfo(countriesData);
        }
      });
    }
  };

  useEffect(() => {
    handleEffect(newCountry, timer);
  }, [newCountry]);

  return (
    <>
      <Filter newCountry={newCountry} handleNewCountry={handleNewCountry} />
      <Content info={info} />
    </>
  );
};

export default App;

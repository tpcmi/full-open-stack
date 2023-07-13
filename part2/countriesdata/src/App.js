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
    console.log(newCountry);
    timer.current = Date.now();
    /**
     * 由于时实根据输入在请求数据，如果之前的请求返回慢了，会导致老的返回结果覆盖新的返回，
     * 需要记录一个时间戳来标记
     * 这是一个深拷贝，所以每次timer.current变换都不会引起triggerTime跟着变化
     * */
    const triggerTime = timer.current;
    if (newCountry !== "") {
      countryService.getCountry(newCountry).then((countriesData) => {
        console.log(triggerTime,':',timer.current,':',newCountry);
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

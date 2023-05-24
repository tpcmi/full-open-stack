import { useState } from "react";
import Country from "./Country";

const Content = ({ info }) => {
  const [selectCountry, setSelect] = useState({});

  if (info.length > 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (info.length > 1) {
    return (
      <>
        {info.map((item) => (
          <div key={item.name.common}>
            {item.name.common}
            <input
              type="button"
              value="show"
              onClick={() => {
                setSelect(item);
              }}
            />
          </div>
        ))}
        <Country speCountry={selectCountry} />
      </>
    );
  } else if (info.length === 1) {
    return <Country speCountry={info[0]} />;
  }
};

export default Content;

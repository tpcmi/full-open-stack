import Weather from "./Weather";

const Country = ({ speCountry }) => {
  if (Object.keys(speCountry).length === 0) {
    return <></>;
  } else {
    return (
      <>
        <h2>{speCountry.name.common}</h2>
        <p>capital {speCountry.capital[0]}</p>
        <p>area {speCountry.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(speCountry.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={speCountry.flags.png} alt={speCountry.flags.alt}></img>
        <Weather capital={speCountry.capital[0]} />
      </>
    );
  }
};

export default Country;

const Filter = ({ newCountry, handleNewCountry }) => (
  <>
    find countries
    <input value={newCountry} onChange={handleNewCountry} />
  </>
);

export default Filter;

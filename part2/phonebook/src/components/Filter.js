const Filter = ({ filterName, handleNewFilter }) => (
    <>
        filter shown with
        <input value={filterName} onChange={handleNewFilter} />
    </>
);

export default Filter
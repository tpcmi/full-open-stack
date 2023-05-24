const Persons = ({ nameToShow }) => (
    <>
        {nameToShow.map((p) => (
            <p key={p.id}>
                {p.name} {p.number}
            </p>
        ))}
    </>
);

export default Persons
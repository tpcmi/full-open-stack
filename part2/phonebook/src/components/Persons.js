const Persons = ({ nameToShow }) => (
    <>
        {nameToShow.map((p) => (
            <p key={p.id}>
                {p.name} {p.phone}
            </p>
        ))}
    </>
);

export default Persons
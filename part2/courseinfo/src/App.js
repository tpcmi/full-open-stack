const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => (sum += part.exercises), 0);
    return (
        <p>
            <b>Total of {total} exercises</b>
        </p>
    );
};

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part part={part} key={part.id}></Part>
        ))}
    </>
);

const Course = ({ course }) => (
    <>
        <Header course={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
    </>
);

const App = () => {
    const course = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <>
            <h1>Web development curriculum</h1>
            {course.map((c) => (
                <Course course={c} key={c.id}></Course>
            ))}
        </>
    );
};

export default App;

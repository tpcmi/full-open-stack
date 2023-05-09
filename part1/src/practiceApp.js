import { useState } from "react";
const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <>
            <Part
                name={props.parts[0].name}
                exercises={props.parts[0].exercises}
            />
            <Part
                name={props.parts[1].name}
                exercises={props.parts[1].exercises}
            />
            <Part
                name={props.parts[2].name}
                exercises={props.parts[2].exercises}
            />
        </>
    );
};

const Total = (props) => {
    return (
        <p>
            Number of exercises{" "}
            {props.parts[0].exercises +
                props.parts[1].exercises +
                props.parts[2].exercises}
        </p>
    );
};

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: { props.allClicks.join(' ') }
        </div>
    )
}

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    const [counter, setCounter] = useState(0);
    let counter2 = 0;
    // setTimeout(
    //   () => setCounter(counter + 1),
    //   1000
    // )
    const increaseByOne = () => setCounter(counter + 1);
    const setToZero = () => setCounter(0);
    const decreaseByOne = () => setCounter(counter - 1);

    // deeper react

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        setAll(allClicks.concat("L"));
        setLeft(left + 1);
    };
    const handleRightClick = () => {
        setAll(allClicks.concat("R"));
        setRight(right + 1);
    };

    // fuction return function
    const [value, setValue] = useState(10)
    // 需要理解是怎样一步步写成箭头函数的简略形式的
    const setToValue = (newValue) => () => {
        console.log("newValue: ", newValue);
        setValue(newValue)
    }

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            <div>{counter}</div>
            <div>
                <Button handleClick={increaseByOne} text="plus"></Button>
                <Button handleClick={setToZero} text="zero"></Button>
                <Button handleClick={decreaseByOne} text="minus"></Button>
            </div>
            <div>{counter2}</div>
            <div>
                <button onClick={() => counter2 + 1}> plus </button>
                <button onClick={() => (counter2 = 0)}>zero</button>
            </div>
            <div>
                {left}
                <Button handleClick={handleLeftClick} text='left'></Button>
                <Button handleClick={handleRightClick} text='right'></Button>
                {right}
                <History allClicks={allClicks}></History>
            </div>
            <h2>
                function return function:
            </h2>
            <div>
                {value}
                <Button handleClick={setToValue(1000)} text={"1000"}></Button>
                <Button handleClick={setToValue(0)} text={"reset"}></Button>
                <Button handleClick={setToValue(value + 1)} text={"plus one"}></Button>
            </div>
        </>
    );
};

export default App;

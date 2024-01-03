import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good}></StatisticLine>
        <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
        <StatisticLine text={"bad"} value={bad}></StatisticLine>
        <StatisticLine
          text={"all"}
          value={good + neutral + bad}
        ></StatisticLine>
        <StatisticLine
          text={"average"}
          value={(good - bad) / (good + neutral + bad)}
        ></StatisticLine>
        <StatisticLine
          text={"positive"}
          value={(good / (good + neutral + bad)) * 100 + "%"}
        ></StatisticLine>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVote, setVote] = useState({ idx: 0, num: 0 });

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleVoteClick = (idx) => () => {
    const copy = [...points];
    copy[idx] += 1;
    setPoints(copy);
    if (copy[idx] >= mostVote.num) {
      setVote({ idx: idx, num: copy[idx] });
    }
  };

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <Button handleClick={handleGoodClick} text="good"></Button>
        <Button handleClick={handleNeutralClick} text="neutral"></Button>
        <Button handleClick={handleBadClick} text="bad"></Button>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <Button handleClick={handleVoteClick(selected)} text={"vote"}></Button>
        <Button
          handleClick={() => {
            setSelected(Math.round(Math.random() * 6));
          }}
          text={"next anecdotes"}
        ></Button>
      </div>
      <h2>Anecdote with most vote</h2>
      <div>{anecdotes[mostVote.idx]}</div>
    </>
  );
};

export default App;

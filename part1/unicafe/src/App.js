import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ goodValue, neutralValue, badValue }) => {
  const average =
    (goodValue - badValue) / (goodValue + neutralValue + badValue);
  const positive = (goodValue * 100) / (goodValue + neutralValue + badValue);
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={goodValue} />
        <StatisticLine text={'neutral'} value={neutralValue} />
        <StatisticLine text={'bad'} value={badValue} />
        <StatisticLine
          text={'all'}
          value={goodValue + neutralValue + badValue}
        />
        <StatisticLine text={'average'} value={isNaN(average) ? 0 : average} />
        <StatisticLine
          text={'positive'}
          value={(isNaN(positive) ? 0 : positive) + ' %'}
        />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = (state, setState) => {
    setState(state + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addFeedback(good, setGood)} text={'good'} />
      <Button
        handleClick={() => addFeedback(neutral, setNeutral)}
        text={'neutral'}
      />
      <Button handleClick={() => addFeedback(bad, setBad)} text={'bad'} />
      <h1>statistics</h1>
      <Statistics goodValue={good} neutralValue={neutral} badValue={bad} />
    </div>
  );
};

export default App;


import './App.css';
import { useState } from "react";

function App() {
  // State hook for managing the counter
  const [counter, setCounter] = useState(1);

  // Function to handle incrementing the counter
  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  function formatNumberWithDigits(number, numberOfDigits) {
    const formattedNumber = String(number).padStart(numberOfDigits, "0");
    return formattedNumber;
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={`/moon/moon.${formatNumberWithDigits(counter, 4)}.jpg`} />
        <button onClick={incrementCounter}>Increase {counter}</button>
      </div>
    </div>
  );
}

export default App;

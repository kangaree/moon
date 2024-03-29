import "./App.css";
import { useState, useEffect } from "react";
import moonData from "./mooninfo_2024.json";

function App() {
  // State hook for managing the counter
  // 959 is the lunar new year moon- Feb 10
  const [counter, setCounter] = useState(959);

  function formatNumberWithDigits(number, numberOfDigits) {
    const formattedNumber = String(number).padStart(numberOfDigits, "0");
    return formattedNumber;
  }

  // Function to get the current date and time in a formatted string
  function getFormattedCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Format: YYYY-MM-DDTHH:mm
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function getFormattedDate(
    year,
    month = 1,
    day = 1,
    hours = 0,
    minutes = 0
  ) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  const minDate = getFormattedDate(2024);
  const maxDate = getFormattedDate(2024, 12, 31, 23, 59);

  useEffect(() => {
    const targetDate = new Date();

    const closestMatch = moonData.reduce((closest, current) => {
      // Parse the current date string into a Date object
      const currentDate = new Date(current.time);

      const currentDiff = Math.abs(currentDate - targetDate);
      const closestDiff = Math.abs(new Date(closest.time) - targetDate);

      return currentDiff < closestDiff ? current : closest;
    }, moonData[0]);

    const index = moonData.indexOf(closestMatch);

    setCounter(index);

    setSelectedDate(getFormattedCurrentTime());
  }, []);

  // State to store selected date
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle date input change
  const handleDateChange = (event) => {
    const newDate = event.target.value;

    setSelectedDate(newDate);

    // Target date as a string
    const targetDateString = newDate;

    // Parse the target date string into a Date object
    const targetDate = new Date(targetDateString);

    const closestMatch = moonData.reduce((closest, current) => {
      // Parse the current date string into a Date object
      const currentDate = new Date(current.time);

      const currentDiff = Math.abs(currentDate - targetDate);
      const closestDiff = Math.abs(new Date(closest.time) - targetDate);

      return currentDiff < closestDiff ? current : closest;
    }, moonData[0]);

    const index = moonData.indexOf(closestMatch);

    setCounter(index);
  };

  return (
    <div className="App">
      <h1>2024 Moons</h1>
      <img
        src={process.env.PUBLIC_URL + `/moon/moon.${formatNumberWithDigits(counter, 4)}.jpg`}
        style={{ maxHeight: "75vh", maxWidth: "100vw" }}
        alt="moon"
      />
      <input
        type="datetime-local"
        min={minDate}
        max={maxDate}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Note: If you're following along with Stephen's course you may notice my code is pretty different here.
// That's because Stephen created his course back when class components were needed to manage state in React.
// In 2021/2022, however, we can use functional components and hooks for a more modern feel.

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(async () => {
    const axiosValues = await axios.get("/api/values/current");
    const axiosSeenIndexes = await axios.get("/api/values/all");
    setValues(axiosValues.data);
    setSeenIndexes(axiosSeenIndexes.data);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index,
    });
    setIndex("");
  };

  const _renderCalculatedValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated Values:</h3>
      {_renderCalculatedValues()}
    </div>
  );
};

export default Fib;

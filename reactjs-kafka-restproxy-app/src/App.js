import './App.css';
import { useState } from 'react';

export default function App() {
  const [topics, setTopics] = useState([]);
  const [inputValue, setInputValue] = useState("");

  async function listTopics() {
    try {
      const res = await fetch("/topics");
      const data = await res.json(); // assuming data is an array of strings
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  }


  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    myFunction(inputValue);
  }
  const payload = {
  records: [
    { value: { foo: "bar" } }
  ]
};
  async function myFunction(value) {
    console.log("You entered:", value);
    const res = await fetch('/topics/' + value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.kafka.json.v2+json',
        'Accept': 'application/vnd.kafka.v2+json'
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('Response:', data);
  }


  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Reactjs-Kafka Rest Proxy App</h1>
     
      <hr></hr>
      <h2>Create Topic</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Topic Name"
      />
      <button onClick={handleClick}>Submit</button>
       <hr></hr>
      <h2>Topic List</h2>
      <button onClick={listTopics}>Fetch Topics</button>
      {topics.length > 0 && (
        <div style={{ maxHeight: "600px", overflowY: "auto", marginTop: "20px", border: "1px solid #ccc" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #000", padding: "8px", textAlign: "left" }}>Topic Name</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


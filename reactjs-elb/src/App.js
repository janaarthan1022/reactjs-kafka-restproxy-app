import './App.css';
import { useState } from 'react';

function App() {

  const [host, setHost] = useState("")
  async function elb() {
    const res = await fetch("/");
    const text = await res.text();
    setHost(text);
  }
  return (
    <div className="App">
      <h1>AWS Elastic Load Balancer Testing</h1>
      <button onClick={elb}>Elastic Load Balancer</button>
      <h2>{host}</h2>
    </div>
  );
}

export default App;

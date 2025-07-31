import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:1122/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    let data;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
      setResponseMsg('User created: ' + JSON.stringify(data));
    } else {
      const text = await res.text();
      setResponseMsg('Server response: ' + text);
    }

  } catch (error) {
    console.error('Error during POST:', error);
    setResponseMsg('Failed to create user.');
  }
}


  return (
    <div className="App">
      <h1>Reactjs Springboot Kafka App</h1>
      <h3>This app illustrates how can we integrate Reactjs, Spring Boot, Camel and Kafka</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <p>{responseMsg}</p>
    </div>
  );
}

export default App;


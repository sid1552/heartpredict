import React, { useState } from 'react';
import './App.css';
import background from './image/background.jpg';

function App() {
  const [inputData, setInputData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = Object.values(inputData).join(',');
    const response = await fetch('http://127.0.0.1:5000/predict', {  // change this during deployment
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: combinedData.split(',').map(Number) }),
    });
    const responseBody = await response.json();
    setPrediction(responseBody.prediction);
  };

  return (
    <div className="App min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Heart Disease Predictor</h1>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input
            type="text"
            name="age"
            value={inputData.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="sex"
            value={inputData.sex}
            onChange={handleChange}
            placeholder="Sex"
          />
          <input
            type="text"
            name="cp"
            value={inputData.cp}
            onChange={handleChange}
            placeholder="CP"
          />
          <input
            type="text"
            name="trestbps"
            value={inputData.trestbps}
            onChange={handleChange}
            placeholder="Trestbps"
          />
          <input
            type="text"
            name="chol"
            value={inputData.chol}
            onChange={handleChange}
            placeholder="Chol"
          />
          <input
            type="text"
            name="fbs"
            value={inputData.fbs}
            onChange={handleChange}
            placeholder="FBS"
          />
          <input
            type="text"
            name="restecg"
            value={inputData.restecg}
            onChange={handleChange}
            placeholder="Restecg"
          />
          <input
            type="text"
            name="thalach"
            value={inputData.thalach}
            onChange={handleChange}
            placeholder="Thalach"
          />
          <input
            type="text"
            name="exang"
            value={inputData.exang}
            onChange={handleChange}
            placeholder="Exang"
          />
          <input
            type="text"
            name="oldpeak"
            value={inputData.oldpeak}
            onChange={handleChange}
            placeholder="Oldpeak"
          />
          <input
            type="text"
            name="slope"
            value={inputData.slope}
            onChange={handleChange}
            placeholder="Slope"
          />
          <input
            type="text"
            name="ca"
            value={inputData.ca}
            onChange={handleChange}
            placeholder="CA"
          />
          <input
            type="text"
            name="thal"
            value={inputData.thal}
            onChange={handleChange}
            placeholder="Thal"
          />
          <button className='bg-black text-white' type="submit">Predict</button>
        </form>
        {prediction && <p>{prediction}</p>}
      </header>
    </div>
  );
}

export default App;

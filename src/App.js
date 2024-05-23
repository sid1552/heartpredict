import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // This is important for registering all Chart.js components
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
  const [chartData, setChartData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSexChange = (e) => {
    setInputData({ ...inputData, sex: e.target.value });
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

    // Example ideal ranges (replace with actual ideal ranges if available)
    const idealRanges = {
      cp: [0, 3],
      trestbps: [90, 140],
      chol: [150, 240],
      fbs: [0, 1],
      restecg: [0, 2],
      thalach: [100, 200],
      exang: [0, 1],
      oldpeak: [0, 2.5],
      slope: [0, 2],
      ca: [0, 3],
      thal: [1, 3]
    };

    const chartLabels = Object.keys(inputData).filter(key => key !== 'age' && key !== 'sex');
    const userData = chartLabels.map(key => Number(inputData[key]));

    const idealMin = chartLabels.map(key => idealRanges[key][0]);
    const idealMax = chartLabels.map(key => idealRanges[key][1]);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Input Data',
          data: userData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: false,
          tension: 0.1
        },
        {
          label: 'Ideal Min',
          data: idealMin,
          borderColor: 'rgba(255,206,86,0.6)',
          backgroundColor: 'rgba(255,206,86,0.3)',
          fill: '+1',
          tension: 0.1
        },
        {
          label: 'Ideal Max',
          data: idealMax,
          borderColor: 'rgba(255,206,86,0.6)',
          backgroundColor: 'rgba(255,206,86,0.3)',
          fill: 1,
          tension: 0.1
        }
      ]
    });
  };

  return (
    <div className="App min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Heart Disease Predictor</h1>
        <form onSubmit={handleSubmit} className='flex flex-wrap -mx-2'>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Age:
              <input
                type="text"
                name="age"
                value={inputData.age}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">Sex:</label>
            <div className="flex items-center mt-1 justify-center">
              <input
                type="radio"
                name="sex"
                value="1"
                checked={inputData.sex === '1'}
                onChange={handleSexChange}
              />
              <label className="ml-2 mr-4">Male</label>
              <input
                type="radio"
                name="sex"
                value="0"
                checked={inputData.sex === '0'}
                onChange={handleSexChange}
              />
              <label className="ml-2">Female</label>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              CP:
              <input
                type="text"
                name="cp"
                value={inputData.cp}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Trestbps:
              <input
                type="text"
                name="trestbps"
                value={inputData.trestbps}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Chol:
              <input
                type="text"
                name="chol"
                value={inputData.chol}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              FBS:
              <input
                type="text"
                name="fbs"
                value={inputData.fbs}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Restecg:
              <input
                type="text"
                name="restecg"
                value={inputData.restecg}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Thalach:
              <input
                type="text"
                name="thalach"
                value={inputData.thalach}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Exang:
              <input
                type="text"
                name="exang"
                value={inputData.exang}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Oldpeak:
              <input
                type="text"
                name="oldpeak"
                value={inputData.oldpeak}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Slope:
              <input
                type="text"
                name="slope"
                value={inputData.slope}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              CA:
              <input
                type="text"
                name="ca"
                value={inputData.ca}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block">
              Thal:
              <input
                type="text"
                name="thal"
                value={inputData.thal}
                onChange={handleChange}
                className="block w-full mt-1"
              />
            </label>
          </div>
          <div className="w-full px-2 mb-4">
            <button className='bg-black text-white w-full py-2' type="submit">Predict</button>
          </div>
        </form>
        {prediction && <p className="mt-4 text-center">Prediction: {prediction}</p>}
        {chartData && <Line data={chartData} />}
      </header>
    </div>
  );
}

export default App;

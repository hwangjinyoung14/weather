// WeatherButton.js
import React from 'react';

const WeatherButton = ({ cities, setCity, onBackgroundChange }) => {
  return (
    <div className='WeatherButton'>
      <div>
        {cities.map((item, index) => (
          <button key={index} onClick={() => { setCity(item); }}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherButton;

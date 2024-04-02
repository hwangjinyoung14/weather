import React from 'react'

const WeatherBox = ({weather}) => {
  //console.log('weather', weather)
  // OpenWeatherMap에서 아이콘을 가져오는 URL을 생성하는 함수
 const getWeatherIconUrl = (iconCode) => {
  return `http://openweathermap.org/img/w/${iconCode}.png`;
  };
  const getWeatherImageUrl
  = (weatherData) => {
  if (weatherData && weatherData.length >0) {
  const weatherDescription
  = weatherData[0]
  .description.toLowerCase();
  switch (weatherDescription) {
  case 'clear sky'
  :
  return './images/clear_sky.png';
  case 'few clouds'
  :
  return './images/few_clouds.png';
  case 'scattered clouds':
  return './images/scattered_clouds.png';
  case 'broken clouds'
  :
  return './images/broken_clouds.png';
  case 'shower rain'
  :
  return './images/shower_rain.png';
  case 'rain'
  :
  return './images/thunderstorm.png';
  case 'thunderstorm'
  :
  return './images/snow.png';
  case 'light snow'
  :
  return './images/snow.png';
  case 'mist'
  :
  return './images/mist.png';
  default
  :
  return './images/default.png'; // 알수 없는 날씨에 대한 기본 이미지 설정
  }
  } else {
  return './images/default.png'; // 기본 이미지 설정 (날씨 정보가 없을 경우)
  }
}

  return (
    <div className='WeatherBox'>
      <div className="weather_left">
      <h3>{weather && weather.name}</h3>
      {/* <h3>위치 가져오기2 {weather?.name}</h3> */}
      <h3>{weather && weather.weather[0]?.description}</h3>
      {/* 좌항 && 우항 > 모두 참일 때 실행된다. 근데 우항은 ? 뒤에 참의 식만 써서 무조건 참만 뜨도록 한 것이다. */}
      <h3>최저 온도 : {weather?.main.temp_min}</h3>
      <h3>최고 온도 : {weather?.main.temp_max}</h3>
      <h3>바람 속도 : {weather?.wind.speed}</h3>
      </div>
      {weather && weather.weather[0]?.icon && (
      // 기존 아이콘 대신 날씨에 따른 이미지로 변경
      <img src={process.env.PUBLIC_URL
        + (weather ? getWeatherImageUrl(weather.weather) : '날씨 정보를 가져올 수 없음')}
        alt="weather image" 
        style={{
          width:"180px",
          marginTop:"15px"
        }} />
      )}
    </div>
  )
}

export default WeatherBox
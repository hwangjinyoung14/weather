import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import './style/App.css';
import GridLoader from "react-spinners/GridLoader";

function App() {
  let [weather, setWeather]=useState(null);
  let [city, setCity]=useState('');
  let [loading, setLoading]=useState(true);
  let cities = ['Daejeon', 'Seoul', 'Cheongju', 'jeju', 'russia'];
  let [backgroundImage, setBackgroundImage] = useState("/images/background.png");//이미지 초기값
  let getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat, lon);
    });} //날씨를 가져오기 위해서 위치를 먼저 가져왔다.
    let getWeatherByCurrentLocation = async (lat, lon) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dabee7c43bbd0e23109a00f960ecfdb9&units=metric`;
    
      try {
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        console.log('Weather data:', data); // 추가
        setWeather(data);
        setLoading(false);
    
        // 날씨에 따라 배경 이미지 변경
        setBackgroundImage(getBackgroundImageByWeather(data));
      } catch (error) {
        console.error('Error fetching weather by current location:', error);
        setLoading(false);
      }
    };
     //배경이미지 반환하는 함수 
     const getBackgroundImageByWeather = (weatherData) => {
      if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
        const weatherDescription = weatherData.weather[0].description.toLowerCase();
    
        switch (weatherDescription) {
          case 'clear sky':
            return `./images/background_clear_sky.png`;
          case 'few clouds':
            return `./images/background_few_clouds.png`;
          case 'scattered clouds':
            return `./images/background_scattered_clouds.png`;
          case 'shower rain':
            return `./images/background_shower_rain.png`;
          case 'thunderstorm':
            return `./images/background_background_thunderstorm.png`;
          case 'light snow':
            return `./images/background_snow.png`;
          // 다른 날씨 상태에 대한 처리 추가
          default:
            console.log('Default image selected');
            console.log('Default image path:', `./images/background.png`);
            return `./images/background.png`;
        }
      } else {
        return `./images/background.png`;
      }
    };
      
    let getWeatherByCity=async()=>{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dabee7c43bbd0e23109a00f960ecfdb9&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      //console.log('data', data);
      setLoading(false);
    }
    
  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  }, [city]);
  
  useEffect(() => {
    const image = new Image();
    image.src = backgroundImage;

    image.onload = () => {
      console.log('Image loaded successfully');
    };

    image.onerror = () => {
      console.error('Error loading image');
    };
  }, [backgroundImage]);
  
  return (
    
    <div className="App" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${getBackgroundImageByWeather(weather)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh' }}>
      {loading? <GridLoader className='GridLoader'
          color="#fff"
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
      <div className='WeatherWrap'>
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
      </div>}
    </div>
  );
}
export default App;
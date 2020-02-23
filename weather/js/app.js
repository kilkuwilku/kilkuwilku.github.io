const btn = document.getElementById('button');
const input = document.getElementById('city');
const key = '059bf24e572d7d97492b46aa2658101c';

btn.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + key + '&units=metric')  
    .then(function(resp) {return resp.json()})
    .then(function(data) {
      //collect necessary data
      let city = data['name'];
      let temp = data['main']['temp'];
      let tempFeelsLike = data['main']['feels_like'];
      let pressure = data['main']['pressure'];
      let wind = data['wind']['speed'];
      let sky = data['weather']['0']['description'];
      let ico = data['weather']['0']['icon'];

      //print into index
      document.getElementById('content').innerHTML = `<div id = 'weather'>
      <h1>${city}</h1><img src = "http://openweathermap.org/img/wn/${ico}@2x.png" id = "ico"/>
      <p>Temperature: ${temp} &#176;C </p>
      <p>But it feels like: ${tempFeelsLike} &#176;C </p>
      <p>Wind: ${wind} km/h</p>
      <p>Pressure: ${pressure} hPa </p>
      <p>Sky: ${sky}</p>
      </div>`;
      //animate results
      document.getElementById('results').style.transition = 'opacity 1s ease-in';
      document.getElementById('results').style.opacity='1';
    })
    
    .catch(function() {
      // catch any errors
    });
  }
);


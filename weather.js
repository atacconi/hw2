let getPosition = function(){
	navigator.geolocation.getCurrentPosition(getWeather);
}

let getWeather = function(position) {
  let coordinates = position.coords;
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  
  console.log('Latitude:' + coordinates.latitude);
  console.log('Longitude:' + coordinates.longitude);
  
  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

let convertToJSON = function(response){
	return response.json();
};

let updateWeather = function(data){
	$('.card-title').text(data.name);
	$('.card-text').text('It is ' + data.main.temp + ' degrees outside');
	$('.card-img-top').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
};

let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
};

$('#get_forecast').click(function(){
	getPosition();
});

// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.

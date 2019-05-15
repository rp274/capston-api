'use strict'
// document.querySelector("#today").valueAsDate = new Date();



function displayEvents(responseJsonE){
  console.log(responseJsonE);
  // console.log(responseJsonE._embedded.events[0].name)
  for(let i=0; i < responseJsonE._embedded.events[0]; i++){
    $('#event-list').append(`
    <li>
      <p>${responseJsonE._embedded.events[0].name}</p>
      <p><a href='${responseJsonE._embedded.events[0].url}'>Official Event Link</a></p>
    </li>
    <br><br>
  `)
  // {
  //    $('#events-results').append(`
  //     <h3>Events:</h3>
  //       <p>${events[i].name}</p>
  //     `);
  }
  $('#event-results').removeClass('hidden');
}

// GET EVENTS
function getEvents(zip) {
  const url = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  const apiKey = '&apikey=9Mbvr2yb59lA0kFaaMfE9rcSukiVGJyJ';
  fetch(url+'postalCode=60640'+apiKey)
    .then(response => response.json())
    .then(responseJsonE => displayEvents(responseJsonE))
    .catch(err => {
      $('#js-error-message').text(`(events)Something went wrong: ${err.message}`);
    });
}





// DISPLAY WEATHER
function displayWeather(responseJsonW){
  // console.log(responseJsonW);
  $('#weather-results').append(`
      <p>${responseJsonW.currently.temperature}<br>feels like: ${responseJsonW.currently.apparentTemperature}</p>
      <p>${responseJsonW.daily.summary}</p>
      `);
  $('#weather-results').removeClass('hidden');
}

// GET WEATHER
function getWeather(local) {
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://api.darksky.net/forecast/0d43e02db78ee945f620500fad6b79a8/'+local;
  const excludes = '?exclude=minutely,hourly,alerts';
  fetch(cors+url+excludes)
    .then(response => response.json())
    .then(responseJsonW => displayWeather(responseJsonW))
    .catch(err => {
      $('#js-error-message').text(`(weather)Something went wrong: ${err.message}`);
    });
}

// GET LOCATION
function getLocation() {
$.getJSON('https://geoip-db.com/json/')
  .done (function(location) {
    const local = location.latitude+','+location.longitude;
    const country = location.country_code;
    const zip = location.postal;
    getWeather(local)
    getEvents(zip)
  });
}


// on load
$(getLocation)

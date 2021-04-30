// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//my key is     85c7eec3fadd4fe0ade12006213004
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3

//My API URL with my key is   https://api.weatherapi.com/v1/forecast.json?key=85c7eec3fadd4fe0ade12006213004&q=Chicago&days=3

// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.






//Trigger load content on loading of the DOM

window.addEventListener('DOMContentLoaded', async function() {
    
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event){
      // - Ignore the default behavior of the button
      event.preventDefault()
      // - Get a reference to the element containing the user-entered location
      let inputLocationElement = document.querySelector(`#location`)
      // - Get the user-entered location from the element's value, check in console
      let inputLocation = inputLocationElement.value
      console.log(inputLocation)
  
  
    //Repeat the steps above to get the value of days entered (1-3 day range)
    // When the "get weather" button is clicked:
    
    // - Get a reference to the element containing the user-entered forecast length
    let inputDaysElement = document.querySelector(`#days`)
    // - Get the user-entered forecast length from the form element's value, check in console
    let inputDays = inputDaysElement.value
    console.log(inputDays)
  
      // - Check to see if the user entered anything in both fields; if so:
      if (inputLocation.length > 0 && inputDays.length > 0) {
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=85c7eec3fadd4fe0ade12006213004&q=${inputLocation}&days=${inputDays}`
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json(url)
        
        // - Write the json-formatted data to the JavaScript console as a check
        console.log(json)
      
        // - Store the interpreted location, current weather conditions, and the forecast as separate variables
        let region = json.location.region 
        let city = json.location.name
        let location = `${city}, ${region}`
  
        let temp = json.current.temp_f
        let condition = json.current.condition.text
  
        //get a reference to the current weather div to update with the live weather info 
        let currentElement = document.querySelector(`.current`)
  
        //inject the retrieved current weather and location info into the html document to display the current info
        currentElement.innerHTML = `
        <div class="text-center space-y-2">
        <div class="font-bold text-3xl">Current Weather for ${location}</div>
        <div class="font-bold">
          <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
          <span class="temperature">${temp}</span>° 
          and
          <span class="conditions">${condition}</span>
        </div>
        </div>
        `

        //get a reference to the forcast weather div to update with the forecast info
        let forecastElement = document.querySelector(`.forecast`)

        //update the forecast display length
        forecastElement.innerHTML = `

          <div class="forecast space-y-4">
          
          <div class="text-center space-y-8">
            <div class="font-bold text-3xl">${inputDays} Day Forecast</div>
            


            </div>
        `

        //make a loop for pulling the forecast from the weather API and add the info to the html dom until all forecasts requested are visible
        for (i = 0; i < json.forecast.forecastday.length; i++) {
            //define variables to use in the loop for each forcasted day
          let date = json.forecast.forecastday[i].date
          let conditionForecasted = json.forecast.forecastday[i].day.condition.text
          let low = json.forecast.forecastday[i].day.mintemp_f
          let hi = json.forecast.forecastday[i].day.maxtemp_f
          let pic = json.forecast.forecastday[i].day.condition.icon

          //insert this string as html for each iteration until all days in the forecast are done
          forecastElement.insertAdjacentHTML('beforeend', `

          <div class="text-center space-y-8 font-bold text-2xl">

          <div>
          <img src="https:${pic}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${date}</h1>
          <h2 class="text-xl">High ${hi}° – Low ${low}°</h2>
          <p class="text-gray-500">${conditionForecasted}</h1>
        </div>

        </div>
        `)
        }   

  
    
      }
 
      })
  })
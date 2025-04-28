const weatherForm = document.querySelector('.weatherForm')
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const apikey = ''

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
  const response = await fetch(apiUrl)
  console.log(response)

  if (!response.ok) {
    throw new Error('Could not fetch weather data')
  }

  return await response.json()
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data
  card.textContent = ''
  card.style.display = 'flex'

  const cityDisplay = document.createElement('h1')
  const tempDisplay = document.createElement('p')
  const humidityDisplay = document.createElement('p')
  const descDisplay = document.createElement('p')
  const weatherEmoji = document.createElement('p')

  cityDisplay.textContent = city
  cityDisplay.classList.add('cityDisplay')

  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
  tempDisplay.classList.add('tempDisplay')

  humidityDisplay.textContent = `Humidity: ${humidity}%`
  humidityDisplay.classList.add('humidityDisplay')

  descDisplay.textContent = description
  descDisplay.classList.add('descDisplay')

  weatherEmoji.textContent = getweatherEmoji(id)
  weatherEmoji.classList.add('weatherEmoji')

  card.appendChild(cityDisplay)
  card.appendChild(tempDisplay)
  card.appendChild(humidityDisplay)
  card.appendChild(descDisplay)
  card.appendChild(weatherEmoji)
}

function getweatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return '⛈️'

    case weatherId >= 300 && weatherId < 400:
      return '🌧️'

    case weatherId >= 500 && weatherId < 600:
      return '🌧️'

    case weatherId >= 600 && weatherId < 700:
      return '🌨️'

    case weatherId >= 700 && weatherId < 800:
      return '🌫️'

    case weatherId === 800:
      return '☀️'

    case weatherId >= 801 && weatherId < 820:
      return '☁️'
    default:
      return '?'
  }
}

function displayEroor(message) {
  const errorDisplay = document.createElement('p')
  errorDisplay.textContent = message
  errorDisplay.classList.add('errorDisplay')

  card.textContent = ''
  card.style.display = 'flex'
  card.appendChild(errorDisplay)
}

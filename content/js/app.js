const $ = document
const Kelvin = 273.15
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const apiData = { url: 'https://api.openweathermap.org/data/2.5/weather?q=', apiKey: "586c7ff2d07d29079bd6a2cb1b5515aa",}
const minAndMaxElm = $.querySelector('.hi-low')
const tempElm = $.querySelector('.temp')
const dateElm = $.querySelector('.date')
const cityElm = $.querySelector('.city')
const weatherElm = $.querySelector('.weather')
const mainElm = $.querySelector('main')
const inputElm = $.querySelector('input')
const DateElm = $.querySelector('.date')
const loadingElm = $.querySelector('.loading')
/////////////////////////////////////////////////////////
function showData (data){
 cityElm.innerHTML = `${data.name} , ${data.sys.country}`
 dateElm.innerHTML = showDate()
   tempElm.innerHTML = `${Math.ceil(data.main.temp - Kelvin)}°c`
   minAndMaxElm.innerHTML = ` ${Math.ceil(data.main.temp_min - Kelvin)}°c / ${Math.ceil(data.main.temp_max - Kelvin)}°c`
   weatherElm.innerHTML = `${data.weather[0].main}`
  }
////////////////////////////////////////////////////////////
  function fetchData() {
  let countryValue = inputElm.value.trim()
  fetch(`${apiData.url}${countryValue}&&appid=${apiData.apiKey}`)
  .then(res => {
      return res.json()
    }).then(data => {
    showData(data)
}).finally(()=>{
  mainElm.classList.add('active')
  loadingElm.style.opacity = "0"
  inputElm.value = ""
})
  }
////////////////////////////////////////////
function showDate(){
    let now = new Date()
    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()
    let date = now.getDate()
    
    return `${day}   ${date}   ${month}   ${year} `
}
/////////////////////////////////////////
inputElm.addEventListener('keyup' , (e) => {
    mainElm.classList.remove('active')
    if(e.keyCode === 13){
      fetchData()
      loadingElm.style.opacity = "1"

    
    }
  })




// Variables
const startbtn = document.querySelector("#startbtn");
const stopbtn = document.querySelector("#stopbtn");
const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const timeZone = document.getElementById("timeZone");
const coords = document.querySelector(".coord").querySelectorAll("p");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.querySelector(".temp").querySelectorAll("p");
const wind = document.querySelector(".wind").querySelectorAll("p");
const clouds = document.getElementById("clouds");
const weatherImg = document.getElementById("weatherImg");
const displayWeather = document.querySelector(".display-none");
let userData = localStorage.getItem("userInfo");
let Temperature = document.querySelector(".weather");
let h6 = document.querySelector("h6");
let main = document.querySelector(".main");
let commands = document.querySelector(".commands");
let charging = document.querySelector("#batteryLevel");
let batteryStatus = document.querySelector("#batteryStatus");
let internetStatus = document.querySelector("#status");
let conversation = document.querySelector(".conversation");
let usermeg = document.querySelector(".usermeg");
let audio = document.querySelector("#audio");
let stopingR;

// Event listeners
document.querySelector("#opencommands").onclick = function(){
  commands.style.display = "inline-block";
  readout("opening commands, I follow the following commands");
}
let closebtn = document
  .querySelector("#close-commands")
  .addEventListener("click", function () {
    commands.style.display = "none";
  });
  document.querySelector("#reset").addEventListener("click",function(){
  readout("reset successfully")
  localStorage.clear()
  setup.style.display = "block";
  document.querySelector(".commands").style.display = "none";
  document.querySelector(".main").style.display = "none";
  document.querySelector(".commands").style.display = "none";
  })
// speech recognition Setup

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onstart = function () {
  console.log("Speech recognition has started");

  stopingR = false;
};
 
recognition.onresult = function (event) {
  const resultList = event.results;
  // Access the first result
  const result = resultList[0];
  // Access the first alternative
  const alternative = result[0];
  // Get the transcript
  let transcript = alternative.transcript;
  transcript = transcript.toLowerCase();
  console.log(transcript);
  // Output the transcript
 
  if(transcript.includes("tell me about yourself")){
readout("I..am..JACK..I. was developed by Ahad.A28")
  }
  if(transcript.includes("who developed you")||transcript.includes("developer name")){
readout("I. was developed by Ahad.A28")
  }
  if(transcript.includes("open developer profile")||transcript.includes("developer profile")){
readout("opaning developer profile")
    window.open(`https://www.github.com/Ahad-A28`);
  }
  
  if (
    transcript.includes("what is your name") ||
    transcript.includes("hello")
  ) {
    readout("Hi, my name is jack , how can i help you?");
  }

  if (transcript.includes("aapka naam kya hai")) {
    readout("Mare naam jack hae sir");
  }
  if (transcript.includes("tumhara naam kya hai")) {
    readout("Mare naam jack hae");
  }
  if (
    transcript.includes("clear my data") ||
    transcript.includes("clear my information") ||
    transcript.includes("delete my data") ||
    transcript.includes("delete my information")
  ) {
    localStorage.clear();
    readout("Your data is cleared");
    location.reload();
  }
  if (
    transcript.includes("i want to update my data") ||
    transcript.includes("i want to update my information") ||
    transcript.includes("update my information") ||
    transcript.includes("update my data")
  ) {
    localStorage.clear();
    readout("OK");
    location.reload();
  }
  if (transcript.includes("what is my name")) {
    readout(`Your Name is ${JSON.parse(userData).name}`);
  }
  if (transcript.includes("bio")) {
    readout(`Your Bio is ${JSON.parse(userData).bio}`);
  }
  if (transcript.includes("what is my location")) {
    readout(`Your location is${JSON.parse(userData).location}`);
  }
  if (transcript.includes("open my instagram profile")) {
    readout("opening your instagram  profile");
    window.open(`https://www.instagram.com/${JSON.parse(userData).instragram}`);
  }
  if (transcript.includes("open my github profile")) {
    readout("opening your github profile");
    window.open(`https://github.com/${JSON.parse(userData).github}`);
  }

  if (transcript.includes("open youtube")) {
    readout("opening youtube");
 
window.open("https://www.youtube.com/");
  }
  if (transcript.includes("open google")) {
    readout("opening google");
   window.open("https://www.google.com/")  ;
  }

  if (transcript.includes("open github")) {
    readout("opening github ");
     window.open("https://github.com/")  ;
  }
  // google Search
  if (
    transcript.includes("search") ||
    transcript.includes("search on google")
  ) {
    readout("hear's the result ");
    let input = transcript.split("");
    input.splice(0, 7);
    input = input.join("").split(" ").join("+");
     window.open(`https://www.google.com/search?q=${input}`)  ;
     ;
  }
  if (transcript.includes("shutdown")) {
    readout("ok sir, shutting down the system");
    stopingR = true;
  }
  if (transcript.includes("my full weather forecast")) {
    readout("hear's the result ");
window.open(`https://www.google.com/search?q=full+weather+forecast ${JSON.parse(userData).locatio}`) 
      ; 
    ;
  }
  if (transcript.includes("close commands")) {
    readout("closing commands");
    commands.style.display = "none";
  }
 
  // youtube search
  if (transcript.includes("play")) {
    readout("hear's the result ");
    let input = transcript.split("");
    input.splice(0, 4);
    input = input.join("").split(" ").join("+");
    
      window.open(`https://www.youtube.com/search?q=${input}`)  ;
    console.log(input);
  }
  // News
  if (transcript.includes("top 10 news headlines")) {
    readout("The top 10 news headline are............");
    getNews ()
    stopingR = true;
  }
  // Commands
  if (transcript.includes("open commands")) {
    readout("opening commands , I follow the following commands");
    commands.style.display = "inline-block";
  }
 

};
recognition.onend = function () {
  if (stopingR === false) {
    startbtn.style.display = "none";
    stopbtn.style.display = "inline-block";
    h6.style.display = "inline-block";
    setTimeout(() => {
      recognition.start();
    }, 6000);
  } else if (stopingR === true) {
    recognition.stop();
    stopbtn.style.display = "none";
    startbtn.style.display = "inline-block";
    h6.style.display = "none";
  }
  console.log("Speech recognition has ended");
};
//  Jack Speech
function readout(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
startbtn.addEventListener("click", function () {
  stopbtn.style.display = "inline-block";
  startbtn.style.display = "none";
  h6.style.display = "inline-block";
  recognition.start();
});
stopbtn.addEventListener("click", function () {
  stopbtn.style.display = "none";
  startbtn.style.display = "inline-block";
  h6.style.display = "none";
  stopingR = true;
});

// Weather
function weather(location) {
  let loc = location;
  let url = `//api.openweathermap.org/data/2.5/weather?q=${loc}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      cityName.textContent = `Location : ${data.name}`;
      country.textContent = `Country : ${data.sys.country}`;
      timeZone.textContent = `Timezone : ${data.timezone}`;
      coords[0].textContent = `Longitude : ${data.coord.lon} °`;
      coords[1].textContent = `Latitude : ${data.coord.lat} °`;
      weatherType.textContent = `Weather type : ${data.weather[0].main}`;
      weatherDesc.textContent = `Weather description : ${data.weather[0].description}`;
      weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temp[0].textContent = `Original Temperature : ${ktc(data.main.temp)} °C`;
      temp[1].textContent = `But it feels like ${ktc(data.main.feels_like)} °C`;
      temp[2].textContent = `Min temperature ${ktc(data.main.temp_min)} °C`;
      temp[3].textContent = `Max temperature ${ktc(data.main.temp_max)} °C`;
      temp[4].textContent = `Pressure : ${data.main.pressure} `;
      temp[5].textContent = `Humidity : ${data.main.humidity} `;

      wind[0].textContent = `Wind speed : ${data.wind.speed} m/s`;
      wind[1].textContent = `Wind deg : ${data.wind.deg} °`;
    } else {
      displayWeather.innerHTML =
        "⚠️⚠️FOR WEATHER INFO CHECK THE SPELING YOU WROTE ⚠️⚠️";
      displayWeather.style.color = "red";
      displayWeather.style.fontWeight = 700;
    }
  };

  xhr.send();
}
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

// User information
const setup = document.querySelector(".userinfo");
setup.style.display = "none";
if (localStorage.getItem("userInfo") === null) {
  setup.style.display = "block";
  Temperature.style.display = "none";
  main.style.display = "none";
  setup.querySelector("button").addEventListener("click", userInfo);
}
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instragram: setup.querySelectorAll("input")[3].value,
    github: setup.querySelectorAll("input")[4].value,
  };
  let testArr = [];
  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
    console.log(e.value);
  });

  if (testArr.includes("")) {
    document.querySelector(".commands").style.display = "none";
    document.querySelector(".main").style.display = "none";
    document.querySelector(".commands").style.display = "none";
    readout("Please  Enter your infomation");
  } else {
    setup.style.display = "none";
    readout("Your information has been saved Successfully");
    localStorage.setItem("userInfo", JSON.stringify(setupInfo));
 
  }
}
weather(JSON.parse(localStorage.getItem("userInfo")).location);

//  Timer

let date = new Date();
let hrs = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let ampm = "AM";
if (hrs >= 12) {
  ampm = "PM";
  hrs = hrs - 12;
}
if (hrs == 0) {
  hrs = 12;
}

let time = `${hrs} : ${min} : ${sec} ${ampm}`;
document.getElementById("time").innerHTML = time;

setInterval(function () {
  let date = new Date();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let ampm = "AM";
  if (hrs >= 12) {
    ampm = "PM";
    hrs = hrs - 12;
  }
  if (hrs === 0) {
    hrs = 12;
  }
  let time = `${hrs} : ${min} : ${sec} ${ampm}`;
  document.getElementById("time").innerHTML = time;
}, 1000);

//Battery Setup
let battery = navigator.getBattery();
battery.then(batterycallback);

function batterycallback(batteryObject) {
  printBatteryStatus(batteryObject);
  setInterval(function () {
    printBatteryStatus(batteryObject);
  }, 3000);
}

function printBatteryStatus(batteryObject) {
  let batteryLevel = Math.floor(batteryObject.level * 100);
  charging.innerHTML = batteryLevel + "%";
  if (batteryObject.charging === true) {
    batteryStatus.textContent = " Charging";
    batteryStatus.style.color = "rgb(47, 255, 0)";
  } else {
    batteryStatus.style.color = "red";
    batteryStatus.style.fontSize = "1.4vw";
    batteryStatus.style.fontWeight = 900;
    batteryStatus.style.left = "13.5vw";
    batteryStatus.style.top = "7.4vw";
    batteryStatus.innerHTML ="UNPLUGGED";
  }
} 
// internet setup
setInterval(() => {
  navigator.onLine
    ? ((internetStatus.textContent = "Online"),
      (internetStatus.style.color = "rgb(47, 255, 0)"))
    : ((internetStatus.textContent = "Offline"),
      (internetStatus.style.color = "red"));
}, 1000);
// News Setup
async function getNews (){
  let url = "//newsapi.org/v2/top-headlines?country=in&apiKey=7dbd0218fd274d2293bf9adf386ab730"
  let req = new Request(url)
await fetch(req).then((response) => response.json()) 
.then((data) => {
let ArrNews = data.articles
ArrNews.length = 10
let a = []
ArrNews.forEach((element,index) => {
  a.push("............ ")
  a.push(" ")
a.push(index+1)
a.push("......... ")
a.push(" ")
a.push(element.title)

})
readout(a)
})
}

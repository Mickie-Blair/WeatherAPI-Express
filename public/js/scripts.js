console.log("Loading Scripts");
const get_weather_form = document.getElementById('get_weather_form');

let weather = document.querySelector('#weather');
let form_div = document.getElementById('form_div');
let results = document.getElementById('results');

let location_div = document.getElementById('location');
let temp = document.getElementById('temp');
let conditions = document.getElementById('conditions');
let icon = document.getElementById('icon');

function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    let openstreetmap =  document.querySelector("#openstreetmap");
    let lat_div = document.querySelector("#latitude");
    let lon_div = document.querySelector("#longitude");
   

    let lat_input = document.querySelector("input[name='latitude']");
    let lon_input = document.querySelector("input[name='longitude']");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      lat_div.innerHTML = latitude;
      lon_div.innerHTML = longitude;
      lat_input.value = latitude;
      lon_input.value = longitude;
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

      openstreetmap.classList.remove('d-none');
      form_div.classList.remove('d-none');
      results.classList.add('d-none');
      weather.classList.remove('d-none');

    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document.querySelector("#find-me").addEventListener("click", geoFindMe);





  get_weather_form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(get_weather_form);
    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));

    console.log(formDataObj);

    const form_action = get_weather_form.getAttribute('action');


    const options = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataObj)
     };

    try {
        const res = await fetch(
            form_action,
            options,
        );

        const resData = await res.json();

        console.log(resData);
        if(resData['name']){            
            location_div.innerHTML = resData['name'];
            temp.innerHTML = Math.ceil(resData['main'].temp);
            let desc_weather = resData['weather'][0];
            conditions.innerHTML = desc_weather['main'];

            let src = ` https://openweathermap.org/img/wn/${desc_weather['icon']}.png`
            let icon_img = document.createElement('img');
            icon_img.classList.add('icon_image');
            icon_img.setAttribute('src', src);
            icon.innerHTML = "";
            icon.appendChild(icon_img);
            form_div.classList.add('d-none');
            results.classList.remove('d-none');
        }
    } catch (err) {
        console.log(err.message);
    }
});
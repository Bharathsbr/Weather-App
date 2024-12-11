const weatherf=document.querySelector(".wform");
const input=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const api="b60c3a0ce2c282c3d73bf6ae57474835";

weatherf.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=input.value;
    if(city)
    {
        try{
            const wd=await getWeatherData(city);
            displayWeatherData(wd);
        }
        catch(error)
        {
            console.log(error);
            displayError(error);
        }
    }
    else
    {
        displayError("Please Enter a city");
    }
});

async function getWeatherData(city)
{
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const response=await fetch(apiurl);
    if(!response.ok)
        {
            throw new Error("Could not fetch weather data");
        }
    return await response.json();
}

function displayWeatherData(data)
{
    console.log(data);
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cd=document.createElement("h1");
    const tmp=document.createElement("p");
    const hum=document.createElement("p");
    const des=document.createElement("p");
    const em=document.createElement("p");

    cd.textContent=city;
    tmp.textContent=`${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
    hum.textContent=`Humidity: ${humidity}%`;
    des.textContent=description[0].toUpperCase()+description.slice(1);
    em.textContent=getEmoji(id);

    cd.classList.add("city");
    tmp.classList.add("temp");
    hum.classList.add("hum");
    des.classList.add("wth");
    em.classList.add("emoji");

    card.appendChild(cd);
    card.appendChild(tmp);
    card.appendChild(hum);
    card.appendChild(des);
    card.appendChild(em);
}

function getEmoji(id)
{
    switch(true)
    {
        case(id>=200 && id<300):
            return "⛈️"
        case(id>=300 && id<400):
            return "🌧️"
        case(id>=500 && id<600):
            return "☔"
        case(id>=600 && id<700):
            return "❄️"
        case(id>=700 && id<800):
            return "🌫️"
        case(id===800):
            return "☀️"
        case(id>=801 && id<810):
            return "☁️"
        default:
            return "❓"
    }
}
function displayError(message)
{
    const err=document.createElement("p");
    err.textContent=message;
    err.classList.add("error");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(err);
}

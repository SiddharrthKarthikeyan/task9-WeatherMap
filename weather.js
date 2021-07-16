let api = `https://goweather.herokuapp.com/weather/`;
let mainDiv = document.createElement("div");
mainDiv.setAttribute("class" , "mainContainer");
mainDiv.innerHTML = "";

function temperatureBox(data,city) {
    
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class" , "temperatureBox");

    let div1 = document.createElement("div");
    div1.setAttribute("class" , "ImageBox");

    let div2 = document.createElement("div");
    div2.setAttribute("class" , "TempDetails");
    

    let h1Tag_city = document.createElement("h1");
    h1Tag_city.setAttribute("class" , "conH1");
   
    let h2Tag_temperature = document.createElement("h1");
    h2Tag_temperature.setAttribute("class" , "tempH1");


    let imgTag = document.createElement("img");
    imgTag.setAttribute("class" , "tempImage cmnForImage");
    let temperature = data.temperature;
    let temp = String(temperature).split(" ");

    if(temp[0] > 40) {
        
        imgTag.setAttribute("src" , "hot.jpg");
    }
    else if(temp[0] <= 40 && temp[0]>= 30){
        
        imgTag.setAttribute("src" , "partial.jpg");
    }
    else if(temp[0] >= 10 && temp[0] <= 29){
       
        imgTag.setAttribute("src" , "rainy.jpg");
    } 
    else if(temp[0] >= 0 && temp[0]<= 10){
        imgTag.setAttribute("src" , "cloudy1.jpg");
    }
    else{
        imgTag.setAttribute("src" , "ice.jpg");
    }
    h1Tag_city.textContent = "SEARCHED FOR : " + city;
    h2Tag_temperature.textContent = "TODAY TEMPERATURE : " + temperature;
 
    div1.append(imgTag);
    div2.append(h1Tag_city , h2Tag_temperature);
    mainDiv.append(div1 , div2);
    document.body.append(mainDiv);
    
  
}


async function weatherFounder(userCity) {
    try {
        let responseData = await fetch(api + userCity);
        let userData = await responseData.json();
         console.log(userData);

        return userData;
    }
    catch(error){
        console.log("Something went wrong");
        
        
    }
    
} 


function userInput() {
    let city = prompt("Enter the city");
    if(city === "") {
        alert("Please enter the correct city name");
        userInput();
    }
    else{
            weatherFounder(city)
            .then((data) => {
            console.log("before call temp");
            temperatureBox(data,city);
            console.log("after call temp");
            })
            .catch(() => {
                let body = document.body;
                let div = document.createElement("div");
                div.setAttribute("class" , "forError");
                let h1 = document.createElement("h1");
                h1.textContent = "SomeThing Went Wrong!!! Pls Refresh tha Page";
                div.append(h1);
                body.append(h1);
            })
    }
    
}
userInput();
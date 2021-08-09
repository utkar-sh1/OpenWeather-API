const express=require("express");
const https =require("https");
const bodyParser=require("body-parser");
//const { log } = require("console");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
    
    const Input=req.body.cityName;
    const apiKey="9791bbd7bea7155adb23817e472a5476";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+Input+"&appid="+apiKey+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
          const weatherData=JSON.parse(data); 
          const temp=weatherData.main.temp;
          const weatherDescription=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const ImgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         
          res.write("<p>The weather is currently "+weatherDescription+"</p>");
          res.write("<h1>The Temperature of "+Input+ " is "+ temp+" degree Celcius.</h1>");
          res.write("<img src="+ImgUrl+">");
          res.send();
        })
    })
});
app.listen(3004, function(){
    console.log("Server is running");
});
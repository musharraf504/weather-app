const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({extended: true}));

app.get("/",function(req, res) {
  res.sendFile(__dirname+"/index.html")

});
app.post("/",function(req, res){

  const cityName = req.body.cityName;

  const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=dd91e1e570da9df7e7f3d1cd7a8b6b9c";
  https.get(url,function(response){

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      var temp = weatherData.main.temp;
      var name = weatherData.name;
      var speed = weatherData.wind.speed;
      var deg = weatherData.wind.deg;
      var des = weatherData.weather[0].description;
      const country = weatherData.sys.country;
      const icon = weatherData.weather[0].icon;
      const weatherImage = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<html>");
      res.write("<body>");
      res.write("<h1>The temprature in "+name+","+country+" is "+temp+" degrees Celcius, <br>Wind speed : "+speed+" m/s, <br>direction : "+deg+" degrees.</h1>");
      res.write("<img src="+weatherImage+">");
      res.write("</body>");
      res.write("</html>");
      res.send();
    });
  });
});

app.listen("3000",function(){
  console.log("server has started for weather app on Port 3000 !");
});

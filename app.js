const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
   res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){
  const city=req.body.city;
  const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=02f7af1d14f10e91535426f83b9830dc&units=metric';
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherReport=JSON.parse(data);
      const description=weatherReport.weather[0].description;
      const temperature=weatherReport.main.temp;
      const icon=weatherReport.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<p>The weather is currently "+description+".</p>");
      res.write("<h1>And the temperature in "+city+" is currently "+temperature+" degree celsius.</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });

});
app.listen(3000,function(){console.log("The server 3000 is running.");});

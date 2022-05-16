const express=require("express");
const res = require("express/lib/response");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    var city=req.body.city
    url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=138c4dbf9f87e577508c48392f37da0e&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weather=JSON.parse(data);
            const temp=weather.main.temp;
            const desc=weather.weather[0].description;
            const icon=weather.weather[0].icon
            var iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(desc); 
            console.log(temp);
            res.write("<h1>the tempreature in "+city+" is :"+temp+"celcius</h1>\n");
            res.write("<p>the weather description is :"+desc+"</p>");
            res.write(`<img src=${iconUrl}>`)
            res.send();
    
        })
    
    })
    console.log(req.body.city);
    console.log("post request successful");
})
app.listen(3000,function(){
    console.log("server running at 3000");
})
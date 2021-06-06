const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
var firstName = req.body.fName;
var lastName = req.body.sName;
var email = req.body.eMail;

var data ={
  members: [
    {
      status:"subscribed",
      email_address:email,
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

var jsonData =JSON.stringify(data);

var url="https://us6.api.mailchimp.com/3.0/lists/b3089e987a";
var options = {
  method: "POST",
  auth: "nightgamer:dc975140e7fdb04cf1sdaf0a4c5d4b25ecb74-us6"
}

const request=https.request(url,options,function(response){
  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html");
  }
  else
    res.sendFile(__dirname+"/failure.html");


  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
 })

request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
  console.log("Running in Port 3000!");
});


// API key
// dc975140e7fb04cf10a4c5d4b25ecb74-us6
// audience id
// b3089e987a

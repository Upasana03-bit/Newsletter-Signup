
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
          {
            email_address: email,
            status: "subscribed",
            merge_fields:{
              FNAME:firstName,
              LNAME:lastName
            }
          }
        ]
      };

    const jsonData = JSON.stringify(data);
    const url = 'https://us14.api.mailchimp.com/3.0/lists/b0077e9264';

    const options={
        method:"POST",
        auth:"upasana03:1936acfecdc9af928473ae2a06744b58-us14"
      };


      const request = https.request(url,options,function(response){
        response.on("data",function(data){
          sub_data = JSON.parse(data)
          if(response.statusCode !== 200){
            res.sendFile(__dirname+"/failure.html")
          }else{
            res.sendFile(__dirname+"/success.html")
          }
        });
      });
    
      request.write(jsonData);
      request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
  });
  
app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server is running on port 3000");
});

// API KEY
// 1936acfecdc9af928473ae2a06744b58-us14
// list ID
// b0077e9264
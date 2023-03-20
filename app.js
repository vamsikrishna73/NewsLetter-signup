const express = require('express');
const bodyParser = require('body-parser');
//const request = require('request');
const https = require('https');
//const { url } = require('inspector');

const app = express();


//specifies a static folder where we store all of the static files
//here te static folder is --- "public"
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.listen(process.env.PORT || 3000,function() {
    console.log("server started at port 3000");
});

app.get('/',function(req,res) {
    res.sendFile(__dirname+"/signup.html");
});


app.post('/',function(req,res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/3c868557bd";
    const options = {
        method : "POST",
        auth : "vamsi:51585623e7e28e640a0b322820fbebcf-us21"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/");
});


//"https://us21.api.mailchimp.com/3.0/lists/3c868557bd";

//a0e2fe5ba8b7e54e7d8ef81366e74978-us21

//api key
//a0e2fe5ba8b7e54e7d8ef81366e74978-us21

//51585623e7e28e640a0b322820fbebcf-us21

//list id
//3c868557bd

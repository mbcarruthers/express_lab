const express = require("express");
const port = 3000;
const path = require("path");
const body_parser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(body_parser.urlencoded({extended : false}));



app.use( (req,res,next) => {
    console.log(req.url);
    next();
});

app.post("/formsubmissions" , (req,res) => {
    fs.readFile("data.json" ,"utf-8" , (err,data) => {
        if(err) console.log(err);
        else {
            const info = {
                first_name : req.body.first_name ,
                last_name : req.body.last_name ,
                email : req.body.email
            };
            const json_data = JSON.parse(data);
            json_data.push(info);
            fs.writeFile("data.json", JSON.stringify(json_data) , (err) => {
                if(err) console.log(err);
            })
        }
    });
    res.send("You're data is now being mined");
});


app.use(express.static(path.join(__dirname , "../public")));

app.listen(port , () => {
    console.log(`we are live on port ${port}`);
});
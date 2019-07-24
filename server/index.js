const express = require("express");
const port = 3000;
const path = require("path");

let app = express();

// needs to be above the express.static
app.use( (req,res,next) => {
    console.log(req.url);
    next();
});

app.use(express.static(path.join(__dirname , "../public")));



app.listen(port , () => {
    console.log(`we are live on port ${port}`);
});
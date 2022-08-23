const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const { v4 : uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

uuidv4();


app.post('/pizza', (req, res) => {   
    const rawData = fs.readFileSync("./data/data.json");

    const data = (JSON.parse(rawData)); // changing JSON to javascript object//decode

    req.body.id = uuidv4();

    data.pizza.push(req.body);

    const newJSON = JSON.stringify(data);// changing java object to JSON//encode

    fs.writeFileSync("./data/data.json", newJSON);// saving data to JSON


    res.send(req.body);
});




app.listen(3000, () => {
    console.log("listening on port 3000");
});


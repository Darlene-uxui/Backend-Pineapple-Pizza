const express = require('express');
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());


app.post('/pizza', (req, res) => {   
    const rawData = fs.readFileSync("./data/data.json");

    const data = (JSON.parse(rawData)); // changing JSON to javascript object//decode

    data.pizza.push(req.body);

    const newJSON = JSON.stringify(data);// changing java object to JSON//encode

    fs.writeFileSync("./data/data.json", newJSON);// saving data to JSON


    res.send(req.body);
});



app.listen(3000);




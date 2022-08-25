const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const { v4 : uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

uuidv4();


app.get('/pizza', (req, res) => {
    const rawData = fs.readFileSync("./data/data.json");
    const data = JSON.parse(rawData);
    res.json(data.pizza);
});


app.post('/pizza', (req, res) => {   
    const rawData = fs.readFileSync("./data/data.json");

    const data = (JSON.parse(rawData)); // changing JSON to javascript object//decode

    req.body.id = uuidv4();

    data.pizza.push(req.body);

    const newJSON = JSON.stringify(data);// changing java object to JSON//encode

    fs.writeFileSync("./data/data.json", newJSON);// saving data to JSON


    res.send(req.body);
});

app.delete('/pizza/:id', (req, res) => {
    const rawData = fs.readFileSync("./data/data.json");
    const data = JSON.parse(rawData);
    
    const newArray = data.pizza.filter((pizza) => {
        return pizza.id != req.params.id;
    });
    data.pizza = newArray;
    const newJson = JSON.stringify(data);
    fs.writeFileSync("./data/data.json", newJson);
    res.send("deleted: " + req.params.id);
});

app.put('/pizza/:id', (req, res) => {
    const rawData = fs.readFileSync("./data/data.json");
    const data = JSON.parse(rawData);
    
    const matchIndex = data.pizza.findIndex((pizza) => {
        return pizza.id === req.params.id
    });
    data.pizza.splice(matchIndex, 1, req.body);
    
    const newJson = JSON.stringify(data);
    fs.writeFileSync("./data/data.json", newJson);

    res.send(req.body);
})



app.listen(3000, () => {
    console.log("listening on port 3000");
});


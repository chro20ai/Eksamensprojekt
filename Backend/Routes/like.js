const fs = require('fs');
const express = require('express');
const routerlike = express.Router()

const likePath = '../Model/likes.json';


//Håndter swipe function
routerlike.get('/like/:id', (req, res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data);
        const userId = req.params["id"];
        res.send(parsedData[userId]);
    }
    ,true);
}); 


//Håndter like function
routerlike.post('/like', (req, res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    
    parsedData.push(req.body)
    fs.writeFile(likePath, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
      
});






module.exports = routerlike;
  
const fs = require('fs');
const express = require('express');
const router = require('./users');
const routermatch = express.Router()

const matchPath = '../Model/match.json';



//CREATE match
routermatch.post('/', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data);
    const newMatchId = parsedData.length;
    req.body.MatchId = newMatchId
    parsedData.push(req.body)
    fs.writeFile(matchPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
      
});

//GET matches
routermatch.get('/showmatches/', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data);
        res.send(parsedData);
    }
    ,true);
}); 

//Delete matches
routermatch.delete('/deletematch/:id', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
        // add the new user
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
//filtermetoden sørger for, at y ikke må være lig nul
        parsedData = parsedData.filter(function(y) {return y !== null});

        fs.writeFile(matchPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);
    
});


module.exports = routermatch;
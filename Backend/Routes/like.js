//Requiring all packages for the route
const fs = require('fs');
const express = require('express');
const { stringify } = require('querystring');
const { parse } = require('path');
const routerlike = express.Router()

//Creating a path to the likes storage
const likePath = '../Model/likes.json';


//Create a like
routerlike.post('/', (req, res) => {
    fs.readFile(likePath, 'utf8', (err, data) => {
    let parsedData = JSON.parse(data)
    //Creating a likeId
    const newLikeId = parsedData.length;
    req.body.likeId = newLikeId
    //Pushing it to the array
    parsedData.push(req.body)
    fs.writeFile(likePath, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
      
});

//Exporting the file
module.exports = routerlike;

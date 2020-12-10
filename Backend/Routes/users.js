//Requiring all packages for the route
const fs = require('fs');
const express = require('express');
const { stringify } = require('querystring');
const { parse } = require('path');
const router = express.Router()

//Creating a path to the users storage
const dataPath = '../Model/users.json';


//CREATE user
router.post('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
    let parsedData = JSON.parse(data)
    //Creating a new user id
    const newUserId = parsedData.length;
    req.body.id = newUserId 
    //Push the user to the array
    parsedData.push(req.body)
    fs.writeFile(dataPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send('new user added');
    });
    })
      
});

//GET user by id
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let parsedData = JSON.parse(data)
        //Get the user with the id
        const userId = req.params['id'];
        userByIdArray = parsedData[userId];
        //Send the user with the id
        res.send(parsedData[userId]);
    });
}); 

// DELETE user by id 
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let parsedData = JSON.parse(data)
        //Get the user to delete by id
        const userId = req.params['id'];
        delete parsedData[userId];
        //Element in array will be null when deleted. 
        //I use the filter function to remove the element from the array
        parsedData  = parsedData.filter(function(removeNull) { return removeNull !== null });
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);
});

//POST log in
router.post('/login', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const userArray = JSON.parse(data);
        for (let i=0; i < userArray.length; i++) {
            //Checking if input data matches data in users.json
        if (req.body.username === userArray[i].username && req.body.password === userArray[i].password) {
                
                let signedIn = userArray[i];
                
                res.status(200).json(signedIn);
                return 
            }
        }
        res.status(400).send('error posting log in');   
    },
    true);
});    

//POST log out
router.post('/logout', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
                res.status(200).json('Logged out succesfully');
                return
            },
    true);   
});    


// UPDATE user by id
router.patch('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let parsedData = JSON.parse(data)
        //Get the user to update by id
        const userId = req.params['id'];
        parsedData[userId] = req.body;
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`User with id:${userId} updated`);
        });
    },
    true);
});


//(Might be able to delete this)
//GET all users
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const userArray = JSON.parse(data);
        res.send(userArray);
    }
    ,true);
});




module.exports = router;
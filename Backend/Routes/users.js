const fs = require('fs');
const express = require('express');
const { stringify } = require('querystring');
const router = express.Router()

//https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
//På ovenstående link om nodejs er der en masse relavante ting at læse om til rapportskrivning. 


const dataPath = '../Model/users.json';
const likePath = '../Model/likes.json'

//Create
router.post('/', (req, res) => {
    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const newUserId = parsedData.length;
    // add the new user
    req.body.id = newUserId 
    parsedData.push(req.body)
    console.log(parsedData)
    //data[newUserId.toString()] = req.body;
    fs.writeFile(dataPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send('new user added');
    });
    })
      
});

//Vise fuldt overblik
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        userByIdArray = parsedData[userId];
        res.send(parsedData[userId]);
    });
}); 

// Delete 
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);

    //Måske lave et if statement. Hvis der står "null" i array'et så bliver det automatisk fjernet. Eller det vil måske ikke virke(hvad med kommaet??)
    //Det skal ikke laves her, men inde i login funktionen, hvor den kigger efter username. Hvis der står "null,", så spring over?.
    // Det har intet med det den her funktion at gøre. Lav et for-loop i loginfunktionen, der tager højde for "null,", og så skal den .pop(). 
});

//login
router.post('/login', (req, res) => {

    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
        //console.log(data)
        // Userarray kunne også være kaldt parsedData, som jeg har gjort under Delete og Create. 
        const userArray = JSON.parse(data);
        //console.log(userArray)
        for (let i=0; i < userArray.length; i++) {
            /*const index = userArray.indexOf("null")
            if (index > -1) 
            { userArray.splice(index, 1) }
            */
        if (req.body.username2 === userArray[i].username && req.body.password2 === userArray[i].password1) {
                
                let signedIn = userArray[i];
                
                res.status(200).json(signedIn);
                return
            }
        }
        console.log(req.body)
        res.status(400).send("fejl");   
    },
    true);
});    

//logout
router.post('/logout', (req, res) => {

    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
                res.status(200).json("Logged out succesfully");
                return
            },
    true);
});    


// UPDATE
router.patch('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        parsedData[userId] = req.body;
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
    true);
});

// DISPLAY PROFILES
/*router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        parsedData[userId] = req.body;
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} displayed`);
        });
    },
    true);
});
*/

//Get all users
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        const userArray = JSON.parse(data);
        res.send(userArray);
    }
    ,true);
});


router.post('/:id', (req, res) => {

    //her skal bruger-input tages fra req-body
    //her skal hentes database array

    fs.readFile(likePath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    
    
    parsedData.push(req.body)
    //console.log(parsedData)
    
    fs.writeFile(likePath, JSON.stringify(parsedData),(e) => {
        res.status(200).send('new like added');
    });
    })
  
});



module.exports = router;
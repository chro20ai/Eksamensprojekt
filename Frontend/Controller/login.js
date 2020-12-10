//Getting the input data form html
let username = document.getElementById('usernameid2');
let password = document.getElementById('passwordid2');

//Function that validates the log in
function validateLogIn() {
    let loginData = {
        username : username.value,
        password : password.value 
    }
    //Checking in ../Routes/users.js if input matches
    axios.post('http://localhost:3000/users/login', loginData)
                .then(function(response){
                    //Setting up local storage for user
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('username', username.value);
                    localStorage.setItem('password', password.value);
                    
                   
                    
                })
                //Sending client to the profile site
                .then(() => window.location = 'profile.html');

}


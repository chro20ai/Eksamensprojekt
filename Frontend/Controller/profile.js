//const app = document.querySelector('div#app');

//Delete User
function deleteUser() {

    //https://www.w3schools.com/jsref/met_win_confirm.asp

    //Confirm if you want to delete the user
    var r = confirm('Are you sure you want to delete this user?');
    if (r == true){
        //Delete the user with the id from localstorage
   axios.delete('http://localhost:3000/users/' + localStorage.getItem('userId'))
   .then(function(res){
       //Deleting the localstorage data as well
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('userId')
        localStorage.removeItem('likeId')
        localStorage.removeItem('matchId')


    })
    //Sending client back to the login page
    .then(() => window.location = 'login.html');
   }
   //If cancelled an alert will be displayed
   else {
       alert('You are still a member')
   }
}
 

   
   
//Get User with id
    function getUser() {
    axios.get('http://localhost:3000/users/' + localStorage.getItem('userId'))
    .then(function(res){
        //document.getElementById('overview').innerHTML = `<p>${JSON.stringify(res.data)}</p>`

        document.getElementById('displayUsername').innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById('displayPassword').innerHTML = `<p>Password: ${JSON.stringify(res.data.password)}</p>`
        document.getElementById('displayFirstName').innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById('displayLastName').innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById('displayAge').innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById('displayGender').innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById('displayInterest').innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`







    })
        document.getElementById('hideButton').innerHTML = `<button onclick='hideUser()'>Hide information</button>`

        //document.getElementById('overview').style.visibility = 'visible';
        document.getElementById('displayUsername').style.visibility = 'visible';
        document.getElementById('displayPassword').style.visibility = 'visible';
        document.getElementById('displayFirstName').style.visibility = 'visible';
        document.getElementById('displayLastName').style.visibility = 'visible';
        document.getElementById('displayAge').style.visibility = 'visible';
        document.getElementById('displayGender').style.visibility = 'visible';
        document.getElementById('displayInterest').style.visibility = 'visible';






        document.getElementById('hideButton').style.visibility = 'visible';


}

    function hideUser(){
        //document.getElementById('overview').style.visibility = 'hidden';
        document.getElementById('displayUsername').style.visibility = 'hidden';
        document.getElementById('displayPassword').style.visibility = 'hidden';
        document.getElementById('displayFirstName').style.visibility = 'hidden';
        document.getElementById('displayLastName').style.visibility = 'hidden';
        document.getElementById('displayAge').style.visibility = 'hidden';
        document.getElementById('displayGender').style.visibility = 'hidden';
        document.getElementById('displayInterest').style.visibility = 'hidden';

        document.getElementById('hideButton').style.visibility = 'hidden';

    }


const h1 = document.querySelector('h1')
const personalGreeting = document.querySelector('.personal-greeting')

//Show your name on profile site. 
function nameDisplayCheck() {
    if(localStorage.getItem('username')){
        let name = localStorage.getItem('username');
        h1.textContent = 'You are logged in as ' + name;
    }
}
//Dette betyder at funtionen bliver kørt til sidst. 
document.body.onload = nameDisplayCheck


//Log ud function
function logOut() {
    
    axios.post('http://localhost:3000/users/logout')
                .then(function(response){
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('matchId')
                    localStorage.removeItem('likeId')
                
                    
                })
                .then(() => window.location = 'login.html');
}

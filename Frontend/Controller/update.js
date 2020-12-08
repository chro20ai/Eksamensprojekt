//Getting all the data from html
let username = document.getElementById('patchUsername');
let password = document.getElementById('patchPassword');
let firstname = document.getElementById('patchFirstName');
let lastname = document.getElementById('patchLastName');
let age = document.getElementById('patchAge');
let gender = document.getElementById('patchGender');
let interest = document.getElementById('patchInterest');

//function to update a profile
function updateUser() {
    var errormessage = ''; 

    //Errors for username
    if (username.value == '' ) {
        errormessage += 'Please type in a username \n';
    }
    else if (username.value.length  <4){
        errormessage += 'Submit a username with at least 4 characters\n'
    }
    
    //Error for first name
    if (firstname.value == '') {
        errormessage += 'Please type in a first name\n'
    }
    
    //Error for last name
    if (lastname.value == '') {
        errormessage += 'Please type in a last name\n'
    }
    
    //Errors for age
    if(age.value == '') {
    errormessage += 'Your age has to be an integer\n'
    }
    else if(age.value > 110){
        errormessage += 'Are you a wizard? Please enter a valid age\n'
    }
    
    //Error for gender
    if(gender.value == '') {
        errormessage += 'Please type in a gender\n';
    }
    
    //Error for interest
    if(interest.value == '')
    errormessage += 'Let other people know of your interest\n'
    
    //Errors for password
    if (password.value == '' || password.value.length <6){
        errormessage += 'Please submit a password with at least 6 characters\n'
    }
    else if (password.value.search(/[a-z]/i) < 0 || password.value.search(/[A-Z]/i) < 0 || password.value.search(/[0-9]/) < 0) {
       errormessage += 'Your password must contain at least one lower case letter, \none upper case letter, \nand a number.'; 
    }
    
    //If errors have been added to the variable the error messages will be alerted
    if (errormessage != ''){
        alert(errormessage)
    }
    else {
    
    //Getting the data input from html
    let updateData = {
        username : username.value,
        password : password.value, 
        firstname : firstname.value,
        lastname : lastname.value,
        age : age.value,
        gender : gender.value,
        interest : interest.value,
        id : localStorage.getItem('userId')
    }

    //Patch the user by the id from local storage
    axios.patch('http://localhost:3000/users/' + localStorage.getItem('userId'), updateData)
                .then(function(response){
                //Change the value in local storage as well
                localStorage.setItem('username', username.value);
                localStorage.setItem('password', password.value);
                })
                //Send client back to profile site
                .then(() => window.location = 'profile.html');
}

}
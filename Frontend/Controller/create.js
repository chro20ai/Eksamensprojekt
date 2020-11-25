let username = document.getElementById("usernameid");
let firstname = document.getElementById("firstnameid");
let lastname = document.getElementById("lastnameid");
let age = document.getElementById("ageid");
let gender = document.getElementById("genderid");
let interest = document.getElementById("interestid");
let password1 = document.getElementById("passwordid");

function validate() {
var errormessage = ""; 

//error for username
    if (username.value == "") {
        errormessage += "box is empty \n";
    }
   
//error for first name
    if (firstname.value == "") {
        errormessage += "First name is empty\n"
    }
    
//error for last name
    if (lastname.value == "") {
        errormessage += "Last name is empty\n"
    }

//error for age
    if(age.value == "") {
    errormessage += "Skriv din alder i tal\n"
    }
//error for gender

    if(gender.value == "") {
        errormessage += "What is your gender?\n";
    }

//error for interest
    if(interest.value == "")
    errormessage += "Write your interest\n"

//error for password

    if (password1.value == "" || password1.value.length <6){
        errormessage += "Submit a password with at least 6 characters\n"
    }

//alert for errors

if (errormessage != ""){
    alert(errormessage)
}

else
		{
            let userdata = {
                username : username.value,
                password1 : password1.value,
                firstname : firstname.value,
                lastname : lastname.value,
                age : age.value, 
                gender : gender.value, 
                interest : interest.value
            }

            axios.post("http://localhost:5000/users", userdata)
            .then(function(response){
                console.log(response);
            })
         alert('You can now log in to the system');
        window.location = "login.html";
		}
}

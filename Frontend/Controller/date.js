/*
//Get match 
var i = 0;
function getProfile() {

    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        //userArray = res.data

        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
        i++
    })

}

//localStorage.getItem('loggedIn')

//Get full profile
function getFullProfile() {
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        //userArray = res.data

        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
        i++
    })
}
*/

//Swipe
var i = 0; 
function swipe(){

    if (i === JSON.parse(localStorage.getItem("loggedIn"))){
        i++
    }
    else if (localStorage.getItem('likeId') == "undefined"){
        alert("no more profiles to swipe")
    }
    
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        localStorage.setItem("likeId", res.data.id);
        document.getElementById("displayFirstname").innerHTML = `<p>Name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>` 
i++ 
    })
}


   function likeUser() {
    axios.post("http://localhost:5000/users/" + localStorage.getItem('likeId'),{
        likeId: localStorage.getItem('likeId'),
        logonId: localStorage.getItem('loggedIn')

    })
                .then(function(response){
                    console.log(response);

})
}

//Get full profile
function getFullProfile() {
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        //userArray = res.data

        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
        i++
    })
}
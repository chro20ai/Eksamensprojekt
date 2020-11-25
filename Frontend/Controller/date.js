//Get match 
function getProfile() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
    })
}

//Get full profile
function getFullProfile() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
    })
}
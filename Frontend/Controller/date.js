//Swipe
var i = 0; 
function swipe(){

    if (i === JSON.parse(localStorage.getItem("loggedIn"))){
        i++
    }
    
    
    axios.get("http://localhost:5000/users/" + i)
    .then(function(res){
        localStorage.setItem("likeId", res.data.id);
        document.getElementById("displayFirstname").innerHTML = `<p>Name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>` 


        document.getElementById('displayUsername').style.visibility = "hidden";
        document.getElementById('displayLastname').style.visibility = "hidden";
        document.getElementById('displayAge').style.visibility = "hidden";
        document.getElementById('displayGender').style.visibility = "hidden";




i++ 

    if (localStorage.getItem('likeId') == "undefined"){
        document.getElementById("displayFirstname").style.visibility = 'hidden';
        document.getElementById("displayInterest").style.visibility = 'hidden';
        document.getElementById("noMoreUsers").innerHTML = '<p>Grab a coffee and wait for more users to be created!</p>'
        alert("no more profiles to swipe")
}
    })


}


   function likeUser() {
    axios.post("http://localhost:5000/users/" + localStorage.getItem('likeId'),{
        likeId: localStorage.getItem('likeId'),
        loginId: localStorage.getItem('loggedIn')

    })
                .then(function(response){
                    console.log(response);

})
}

//Get full profile
function getFullProfile() {
    axios.get("http://localhost:5000/users/" + localStorage.getItem('likeId'))
    .then(function(res){

        document.getElementById('displayUsername').style.visibility = "visible";
        document.getElementById('displayLastname').style.visibility = "visible";
        document.getElementById('displayAge').style.visibility = "visible";
        document.getElementById('displayGender').style.visibility = "visible";



        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
    
        if (localStorage.getItem('likeId') === "undefined"){
            document.getElementById('displayUsername').style.visibility = "hidden";
            document.getElementById('displayLastname').style.visibility = "hidden";
            document.getElementById('displayAge').style.visibility = "hidden";
            document.getElementById('displayGender').style.visibility = "hidden";
        }
    })
   
    
}
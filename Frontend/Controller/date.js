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
    axios.post("http://localhost:5000/users/like/", {
        loggedIn: localStorage.getItem("loggedIn"),
        id: localStorage.getItem("likeId")
    })
    .then(function(res){
            for ( i = 0; i < res.data.length; i++){
                for ( j = 0; j < res.data.length; j++){

                    if ( res.data[i].loggedIn === res.data[j].loggedIn && res.data[i].id === res.data[j].id && j!==i){
                        return alert('You have already liked this user');
                    }
                    else if (res.data[i].loggedIn === res.data[j].id && res.data[i].id === res.data[j].loggedIn && j!==i) {
                                axios.post("http://localhost:5000/users/match/match", {
                                id1 : res.data[i].loggedIn, 
                                id2 : res.data[j].loggedIn
                                })  
                                .then(function(res){
                                console.log(res);
                                })  
                                return alert("Du har et match")
                                }
                   }   
                }
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

function showmatches() {
    axios.get("http://localhost:5000/users/match/showmatches/")
    .then(function(res){
    // Kun have console.log med hvis dataen fra requested skal vises i browserens console.log. 
    console.log(res);
    
    for ( i = 0; i < res.data.length; i++){
        
        if ( res.data[i].id1 === localStorage.getItem("loggedIn")){
            console.log(res.data[i].id2);
            
                axios.get("http://localhost:5000/users/" + res.data[i].id2)
                .then(function(res){
                    //alert(JSON.stringify(res.data));
                    console.log(res)
                    

    var myName = JSON.stringify(res.data.firstname);
    var age = JSON.stringify(res.data.age);
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">`;
    row.insertCell(1).innerHTML= myName;
    row.insertCell(2).innerHTML= age;
                    
                })
            
        }
        else if ( res.data[i].id2 === localStorage.getItem("loggedIn")){
            axios.get("http://localhost:5000/users/" + res.data[i].id1)
                .then(function(res){
                    //alert(JSON.stringify(res.data.firstname));

                    var myName = JSON.stringify(res.data.firstname);
                    var age = JSON.stringify(res.data.age);
                    var table = document.getElementById("myTableData");
                 
                    var rowCount = table.rows.length;
                    var row = table.insertRow(rowCount);
                 
                    row.insertCell(0).innerHTML= `<input type="button"  id =  value = "Delete" onClick="deleteRow()">`;
                    row.insertCell(1).innerHTML= myName;
                    row.insertCell(2).innerHTML= age;
                    return
                })
        }
    }
}) 
}
//Create User
function addUser(){
	  var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
		//materialize toast
	M.toast({html: error.message});
});}

function submitCreds(){
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
	//materialize toast
	M.toast({html: error.message});
});
showLogoff();
}

function logOff(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
		//materialize toast
	M.toast({html: error.message});
});
		showLoginBtn();
}

//Log to local console
function consoleLog(name){
  console.log(name);
}

function showLoginForm(){
	document.getElementById('UserPower').style.display = "block";
	document.getElementById('login-btn').style.display = "none";
}
function showLoginBtn(){
	document.getElementById('UserPower').style.display = "none";
	document.getElementById('login-btn').style.display = "block";
}
function showLogoff(){
	//may want to wrap these into one element in future
	document.getElementById('UserPower').style.display = "none";
	document.getElementById('login-btn').style.display = "block";
}
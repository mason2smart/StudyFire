//init materialize tabs
var instance = M.Tabs.init(el, options);

var newUser = Boolean(false);

function consoleLog(name) {
	console.log(name);
}
//Varify Registration Form Inputs
function regFormVeri() {
	var validEmail;
	var validPass;
	validEmail = validateRegVal($('#regEmail').val(), $('#validate-regEmail').val());
	validPass = validateRegVal($('#regPassword').val(), $('#validate-regPassword').val());
	if (validEmail == 0) {
		document.getElementById('validRegEmail').style.color = "red";
		document.getElementById('validRegEmail').class = "red";

	} else {
		document.getElementById('validRegEmail').style.color = "";
	}
	if (validPass == 0) {
		document.getElementById('validRegPass').style.color = "red";
	} else {
		document.getElementById('validRegPass').style.color = "";
	}
	if (validEmail != 1 || validPass != 1 || valRegFormComplete() == false) //disable signup if not complete
	{
		consoleLog(valRegFormComplete());
		console.warn('form not valid');
		$('#signup-button').addClass('disabled');
	} else {
		$('#signup-button').removeClass('disabled');
	}
}

function validateRegVal(val1, val2) {
	if (val1 != null && val1 != "" && val2 != null && val2 != "") {
		return val1 === val2;
	} else return -1;
}

function valRegFormComplete() { //validate form filled out
	var valEmail = new Boolean($('#validate-regEmail').val() == null || $('#validate-regEmail').val() == "");
	var valPass = new Boolean($('#validate-regPassword').val() == null || $('#validate-regPassword').val() == "");
	var pass = new Boolean($('#regPassword').val() == null || $('#regPassword').val() == "");
	var email = new Boolean($('#regEmail').val() == null || $('#regEmail').val() == "");
	var fName = new Boolean($('#first-name').val() == null || $('#first-name').val() == "");
	var lName = new Boolean($('#last-name').val() == null || $('#last-name').val() == "");
	var college = new Boolean($('#select-college').val() == null || $('#select-college').val() == "0");


	if (college==true || valPass == true || pass == true || email == true || valEmail == true || fName == true || lName == true) {
		return false;
	} //else
	return true;
}


$(document).ready(function () {
	$('#register input').on('change', function () {
		regFormVeri();
	})
	$('#register select').on('change', function () {
		regFormVeri();
	})
	$('#register input').on('keyup', function () {
		regFormVeri();
	})
});




//Create User
async function addUser() {
	var user = null;
	var validEmail = validateRegVal($('#regEmail').val(), $('#validate-regEmail').val());
	var validPass = validateRegVal($('#regPassword').val(), $('#validate-regPassword').val());


	if (validEmail != 1 || validPass != 1 || valRegFormComplete() == false) //disable signup if not complete
	{
		M.toast({
			html: "Registration Form Invalid"
		});
		return; //exit early
	} else {
		//create new user
		newUser = Boolean(true);
		var email = document.getElementById('regEmail').value;
		var password = document.getElementById('regPassword').value;
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
			var user = firebase.auth().currentUser;
			displayName = document.getElementById('first-name').value;
			user.updateProfile({
				displayName: document.getElementById('first-name').value
					//photoURL: photoURL
			});
			uid = user.uid;
		}).then(async function () {
			var SubmitDocs = false;
			var SubmitDocs = await submitNewUserData();
			consoleLog("submit user data " + SubmitDocs);
			while (SubmitDocs == false) {}
			window.location.replace('./Dashboard/');
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			//materialize toast
			M.toast({
				html: error.message
			});
			return; //exit early
		});
	}
}


var uid;
var displayName;
var docPath;
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		if (user.displayName != "null" && user.displayName != null) {
			displayName = user.displayName;
		}
		docPath = firestore.collection("users").doc(user.uid);
		uid = user.uid;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var providerData = user.providerData;

		consoleLog("LOGGED IN FIRED AUTH LISTENER");
		//toast welcome message
		M.toast({
			html: "Welcome " + displayName
		});
		if (!newUser) {
			window.location.replace('./Dashboard/');
		}

	} else {
		// User is signed out.
		uid = null;
		displayName = null;
		docPath = null;
	}
});


//------FIRESTORE-------
var firestore = firebase.firestore();

async function submitNewUserData() {
	{
		await firestore.collection("users").doc(uid).set({
			fName: $('#first-name').val(),
			lName: $('#last-name').val(),
			college: $('#select-college').val(),
		});
		return true;
	}
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
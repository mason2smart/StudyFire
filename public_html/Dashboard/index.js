function consoleLog(name) {
	console.log(name);
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
			window.location.replace('./Dashboard/');

	} else {
		// User is signed out.
		uid = null;
		displayName = null;
		docPath = null;
		window.location.replace('../');
	}
});


//------FIRESTORE-------
var firestore = firebase.firestore();





function logOff(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
		//materialize toast
	M.toast({html: error.message});
});
}

//Log to local console
function consoleLog(name){
  console.log(name);
}
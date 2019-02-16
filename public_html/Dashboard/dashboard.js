function consoleLog(name) {
	console.log(name);
}


var uid;
var displayName;
var docPath;
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		displayName = user.displayName;
		docPath = firestore.collection("users").doc(user.uid);
		uid = user.uid;
		email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var providerData = user.providerData;

		dispUserInfo(); //display user info on page

		consoleLog("LOGGED IN FIRED AUTH LISTENER");
		//toast welcome message
		M.toast({
			html: "Welcome " + displayName
		});

	} else {
		// User is signed out.
		uid = null;
		email = null;
		displayName = null;
		docPath = null;
		//window.location.replace('../');
	}
});







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


//display profile pic if exists
function previewProfPic() {
	var storageRef = firebase.storage().ref(uid + '/images/'); 
	var profpicRef = storageRef.child('profPic');
	profpicRef.getDownloadURL().then(function(url) {
	profPic.src = url;
	console.log('downloaded profpic');
});}




//------FIRESTORE-------
var firestore = firebase.firestore();

function dispUserInfo() { //can be called agian to update user info
	var fName;
	var lName;
	var college;
	var hasProfPic = Boolean(false);
	firestore.collection('users').doc(uid).get().then(function (doc) {
		if (doc.exists) {
			var data = doc.data();
			fName = data.fName;
			lName = data.lName;
			college = data.college;
			//gender = data.gender; maybe add option later
			hasProfPic = data.profPic; 
		}
		//if (gender == "M") {
			//gender = "Male";
		//} else if (gender == "F") {
			//gender = "Female";
		//}
		//uName.innerText = displayName;  //displays configured USERNAME -- Not stored in firestore
		flName.innerHTML = fName + " " + lName + '  <font class="materialize-red-text">|</font>  ' + college;
		eMail.innerText = email;
			if (hasProfPic != null){
		previewProfPic(); }
	})
}


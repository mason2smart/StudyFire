function logOff() {
	firebase.auth().signOut().then(function () {
		// Sign-out successful.
	}).catch(function (error) {
		// An error happened.
		//materialize toast
		M.toast({
			html: error.message
		});
	});
}

$(document).ready(function () {
	$('#uploadInput input').on('change', function () {
	consoleLog("INPUT TRIGGER: " + document.querySelector('#upload').files[0].name );
		previewProfPic();
	})});

var file;
var hasNewProfPic = Boolean(false);
var profPicRef
function previewProfPic() {
	
	
	file = document.querySelector('#upload').files[0];
	
//var storageRef = firebase.storage().ref(uid + '/temp/'); //remember to delete temp folder when done...
var storageRef = firebase.storage().ref(uid + '/images/'); 
	var profpicRef = storageRef.child('profPic');
	var uploadTask;
	hasNewProfPic = true;
	var progress = 0;
	uploadTask = profpicRef.put(file);
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
 	function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
		hasNewProfPic = false;
		consoleLog(error.code + " newProfPic" + hasNewProfPic);
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
 // switch (error.code) {
   // case 'storage/unauthorized':
      // User doesn't have permission to access the object
    //  break;

   // case 'storage/canceled':
      // User canceled the upload
   //   break;

  //    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
    //  break;
 // }
}); /*function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    consoleLog('File available at', downloadURL);
  });*/

	// Get the download URL
	return uploadTask.then(new function (){    
	console.log('upload succeeded')
	profpicRef.getDownloadURL().then(function(url) {
	profPic.src = url;
	newPicUserInfo(); //store that a profile pic has been uploaded
	}).catch(function(error) {
	consoleLog("download error " + error.code);
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  }
);
	});
	//functions.storage.object().onFinalize((object) => {});
}

$(function () {
	$("#profpicLink").on('click', function (e) {
		e.preventDefault();
		$("#upload:hidden").trigger('click');
	});
});

//Log to local console
function consoleLog(content) {
	console.log(content);
}

//------FIRESTORE-------
var firestore = firebase.firestore();

//------FIREBASE AUTH USER------
//attaching observer to authentication
var uid;
var displayName;
var docPath;
var email;
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
		window.location.replace('../');
	}
});

function dispProfPic() { //show profile pic on page load
	var storageRef = firebase.storage().ref(uid + '/images/'); 
	var profpicRef = storageRef.child('profPic');
	profpicRef.getDownloadURL().then(function(url) {
	profPic.src = url;
	console.log('downloaded profpic');
});}

function dispUserInfo() { //can be called agian to update user info
	var fName;
	var lName;
	var hasProfPic;
	firestore.collection('users').doc(uid).get().then(function (doc) {
		if (doc.exists) {
			var data = doc.data();
			fName = data.fName;
			lName = data.lName;
			hasProfPic = data.profPic;

		}
		flName.innerText = fName + " " + lName;
		eMail.innerText = email;
		if (hasProfPic != null){
		dispProfPic(); }
	})
}

function newPicUserInfo() { //store that a profile pic has been uploaded
			firestore.collection('users').doc(uid).get().then(function (doc) {
			if (doc.exists) { 
				if (hasNewProfPic) {
					firestore.collection("users").doc(uid).update({
						profPic: Boolean(true)
				})
					consoleLog("new profpic submitted to user profile")
}}});}

function submitUserInfo() {
		firestore.collection('users').doc(uid).get().then(function (doc) {
			if (doc.exists) { 
				//for now
							window.location.replace('../Dashboard/');
}});}

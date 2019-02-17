var termVar;
var offeringNameVar;
var courseTitleVar;

function parseCourses() {

	// loading JSON file
	var client = new XMLHttpRequest();
	client.open('GET', './current-en.json');
	client.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var courseEntries = JSON.parse(this.responseText);

			// a reference to could firestone database
			var db = firebase.firestore();
			// Add parse each entry in JSON to the database
			for (var i = 0; i < courseEntries.length; i++) {
				termVar = courseEntries[i].Term.toString();
				offeringNameVar = courseEntries[i].OfferingName.toString();
				courseTitleVar = courseEntries[i].Title.toString();
				var doc = firebase.firestore().collection("college").doc("JHU").collection("semester").doc(termVar).collection("class").doc(offeringNameVar);
				db.collection("college").doc("JHU").collection("semester").doc(termVar).collection("class").doc(offeringNameVar).get().then(function (doc) {
					if (doc.exists) {
						console.log(termVar);
						return firebase.firestore().collection("college").doc("JHU").collection("semester").doc(termVar).collection("class").doc(offeringNameVar).update({
							courseName: courseTitleVar
						});
					} else {
						return firebase.firestore().collection("college").doc("JHU").collection("semester").doc(termVar).collection("class").doc(offeringNameVar).set({
							courseName: courseTitleVar
						});
					}
				}).catch((fail) => {
					console.log(fail);
				});
			}
		}
	}
	client.send();
}


// start parsing
parseCourses();

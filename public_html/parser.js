function parseCourses() {
    //
    // var dataFile = JSON.parse(whitingSchoolOfEngineering);
    // console.log(dataFile[0].Title);
    //
    // console.log("array length is: " + dataFile.length);


    var client = new XMLHttpRequest();
    client.open('GET', '/whitingSchoolOfEngineering.json');
    client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log("arr length" + myObj.length);
            console.log(myObj[0].Title);
        }
    }
    client.send();

    var app = firebase.initializeApp(config);
    var db = firebase.firestore(app);

// Add a new document in collection "courses"
    db.collection("courses").doc("whitingSchoolOfEngineering").set({
        name: "testName",
        term: "testTerm"
    })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

}


parseCourses();
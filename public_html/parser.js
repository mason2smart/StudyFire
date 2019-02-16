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


     var db = firebase.firestore();

// Add a new document in collection "courses"
    for (i = 0; i < myObj.length; i++) {
        db.collection("college").doc("JHU").collection("semester").doc(myObj.Term).collection("class").doc(myObj.OfferingName).set({
            // courseName: "Intermediate Progamming",
            // courseNumber: "EN601220",
            // courseTerm: "testTerm"
        })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

    }


    // db.collection("courses").add({
    //     name: "testName",
    //     term: "testTerm"
    // })
    //     .then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });




}

// var database = firebase.database();
//
// function writeCourseData(courseID, title, term) {
//     firebase.database().ref('courses/' + courseID).set({
//         courseNumber: courseID,
//         courseName: title,
//         courseTerm: term
//     });
// }

parseCourses();
//writeCourseData("EN601220", "Intermediate Programming", "Spring2019");
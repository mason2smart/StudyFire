function parseCourses() {
    //
    // var dataFile = JSON.parse(whitingSchoolOfEngineering);
    // console.log(dataFile[0].Title);
    //
    // console.log("array length is: " + dataFile.length);

    var client = new XMLHttpRequest();
    client.open('GET', './whitingSchoolOfEngineering.json');
    client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log("testing 5 items \n");



            var db = firebase.firestore();

// Add a new document in collection "courses"
            for (i = 0; i < 5; i++) {
                db.collection("college").doc("JHU").collection("semester").doc(myObj[i].Term).collection("class").doc(myObj[i].OfferingName).set({
                    courseName: myObj[i].Title
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

        }
    }
    client.send();





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
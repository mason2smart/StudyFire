function parseCourses() {

    // loading JSON file
    var client = new XMLHttpRequest();
    client.open('GET', './current-en.json');
    client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var courseEntries = JSON.parse(this.responseText);

            // a reference to could firestone database
            var db = firebase.firestore();
            // Add parse each entry in JSON to the database
            for (i = 0; i < courseEntries.length; i++) {
                db.collection('college').doc("JHU").collection("semester").doc(courseEntries[i].Term)
                    .collection("class").doc(courseEntries[i].OfferingName).get().then(function (doc) {
                    if (doc.exists) {
                        courseName: courseEntries[i].Title
                            .then(function () {
                                console.log("Document successfully updated!" + i);
                            })
                            .catch(function (error) {
                                console.error("Error updating document: ", error);
                            });
                    } else {
                        doc.set({
                            courseName: courseEntries[i].Title
                        })
                            .then(function () {
                                console.log("Document successfully written!" + i);
                            })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });
                    }
                    //
                    // db.collection("college").doc("JHU").collection("semester").doc(courseEntries[i].Term).collection("class").doc(courseEntries[i].OfferingName).set({
                    //     courseName: courseEntries[i].Title
                    // })

                });
        }
    }
    client.send();
}


// start parsing
parseCourses();

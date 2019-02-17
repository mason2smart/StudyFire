let dataFile = require('./current-en.json');
console.log(dataFile[0].Status);


counter = 0;

for (i=0;i<dataFile.length; i++){
    if (dataFile[i].SectionName == "01") {
        counter++;
        console.log("\""+dataFile[i].Title + "\": null,");
    }
}

console.log("array length is: " + counter);

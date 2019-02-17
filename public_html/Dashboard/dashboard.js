function consoleLog(name) {
	console.log(name);
}

//initialize dropdown form
		 $(document).ready(function(){
    $('select').formSelect();
  });




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



//querysearch
var currSemester = $('#select-semester').val();
function querySearch() {
	var currSemester = $('select-semester').val(); //change in input rerun
	var currClass = $('class-search').val();
	//college/{school}/semester/{semester}/class/{class
												
												
	if(currClass!=null && currClass.length > 4){
	var queryRef = firebase.database().ref("college").doc(college).collection(semester).doc(currSemester).collection("class");
	queryRef.orderByChild("class").equalTo(currClass).on("child_added", function(snapshot) {
		console.log(snapshot.key);
	});
	}
}

$(document).ready(function () {
	$('#class-form').on('change', function () {
		querySearch();
	})
//	$('#register select').on('change', function () {
//		regFormVeri();
//	})
	$('#class-form').on('keyup', function () {
		querySearch();
	})
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

	var college;
function dispUserInfo() { //can be called agian to update user info
	var fName;
	var lName;
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

var courseNumber;
var db = firebase.firestore();
function addCourse() {

    var str = document.getElementById('autocomplete-input').value
    document.getElementById('autocomplete-input').value = "";

    var classQuery = db.collection("college").doc("JHU").collection("semester").doc("Spring 2019").collection("class").where("courseName", "==", str);
    classQuery.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        courseNumber = doc.id;
        });
    }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
	console.log(courseNumber);
    var path = "college/JHU/Spring 2019/class/" + courseNumber + "/" + str + "/";
    var user = firebase.auth().currentUser;

    db.collection("users").doc(uid).set({
        coursePath: path
    }, {merge: true});

    // db.collection("users").doc(uid).update({
    //             courseList: firebase.firestore().FieldValue.arrayUnion(path)
    //         });


    var studentMap = {studentID: uid , studentName: user.displayName};
    console.log(studentMap);

    db.collection("college").doc("JHU").collection("semester").doc("Spring 2019").collection("class").doc(courseNumber).set({
        studentMap: studentMap
    }, {merge: true});
}


function displayCourse(studentID) {
    db.collection("users").doc(studentID)

}


function displayStudent() {

}


$(document).ready(function(){
    $('input.autocomplete').autocomplete({
        data: {
            "Gateway Computing: JAVA": null,
            "Gateway Computing: Python": null,
            "Gateway Computing: Matlab": null,
            "Biomedical Engineering Innovation": null,
            "Bootcamp: Python": null,
            "Bootcamp: MATLAB": null,
            "Engineering Research Practicum": null,
            "Research Laboratory Safety": null,
            "Seminar: Environmental and Applied Fluid Mechanics": null,
            "Academic Ethics": null,
            "Seminar in Computational Sensing and Robotics": null,
            "Preparation for University Teaching": null,
            "Engineering Research Practicum": null,
            "Modern Alchemy": null,
            "MSE Design Team I": null,
            "MSE Design Team I": null,
            "Thermodynamics/Materials": null,
            "Electronic Properties of Materials": null,
            "Biomaterials I": null,
            "MSE Design Team I": null,
            "Introduction to Ceramics": null,
            "Transmission electron microscopy:  principle and practice": null,
            "Micro and Nano Structured Materials & Devices": null,
            "Materials Science Laboratory II": null,
            "Biomaterials Lab": null,
            "Senior Design/Research II": null,
            "Biomaterials Senior Design II": null,
            "Nanomaterials Senior Design II": null,
            "MSE Design Team II": null,
            "MSE Design Team Leader": null,
            "Three Dimensional Microstructural Characterization of Mateirals": null,
            "Research in Materials Science": null,
            "Independent Study": null,
            "Phase Transformations of Materials": null,
            "Mechanical Properties of Materials": null,
            "Advanced Biomaterials": null,
            "Physical Properties of Materials": null,
            "Transmission electron microscopy:  principle and practice": null,
            "Three-Dimensional Microstructural Characterization of Materials": null,
            "Materials Research Seminar": null,
            "Materials Science Seminar": null,
            "Graduate Research": null,
            "Computational Modeling for Electrical and Computer Engineering": null,
            "Digital Systems Fundamentals": null,
            "Light, Image and Vision": null,
            "ECE Engineering Team Project (Freshmen and Sophomores)": null,
            "Signals & Systems": null,
            "Introduction To VLSI": null,
            "Electromagnetic Waves": null,
            "Computer Architecture": null,
            "Advanced Digital Systems": null,
            "Mastering Electronics": null,
            "Leading Innovation Design Team": null,
            "Internet of Things Project Lab": null,
            "Control Systems": null,
            "Signals, Systems and Machine Learning": null,
            "Image Process & Analysis II": null,
            "Computation for Engineers": null,
            "Medical Image Analysis": null,
            "Deep Learning": null,
            "Electronics Design Lab": null,
            "Advanced Micro-Processor Lab": null,
            "Leading Innovation Design Team": null,
            "Speech Technologies Reading Group": null,
            "Introduction To Lasers": null,
            "Bio-Photonics Laboratory": null,
            "Physics of Semiconductor Electronic Devices": null,
            "Mixed-Mode VLSI Systems": null,
            "ECE Undergraduate Research": null,
            "ECE Group Undergraduate Research": null,
            "Electrical & Computer Engineering Seminar": null,
            "Image Processing & Analysis II": null,
            "Computation for Engineers": null,
            "Medical Image Analysis": null,
            "Integrated Photonics": null,
            "Photovoltaics and Energy Devices": null,
            "Ultrasound and Photoacoustic Beamforming": null,
            "Deep Learning": null,
            "Compressed Sensing and Sparse Recovery": null,
            "Introduction to Radar Systems": null,
            "Filtering and Smoothing": null,
            "Leading Innovation Design Team": null,
            "Information Extraction": null,
            "Dynamic  Implicit Surfaces": null,
            "Speech Technologies Reading Group": null,
            "Speech and Auditory Processing by Humans and Machines": null,
            "Introduction to Lasers": null,
            "Bio-Photonics Laboratory": null,
            "Physics of Semiconductor Electronic Devices": null,
            "Mixed-Mode VLSI Systems": null,
            "Current Topics in Language and Speech  Processing": null,
            "Advanced Electronic Lab Design": null,
            "Seminar: Medical Image Analysis": null,
            "Emerging Models of Computation": null,
            "Advanced Topics in Electrical and Computer Engineering": null,
            "Independent Study": null,
            "MechE Undergraduate Seminar II": null,
            "MechE Freshman Lab II": null,
            "Intro to Mechanics II": null,
            "Mechanical Engineering Dynamics": null,
            "MechE Dynamics Laboratory": null,
            "Mechanics-Based Design": null,
            "Mechanics Based Design Laboratory": null,
            "Electronics & Instrumentation": null,
            "Manufacturing Engineering": null,
            "Heat Transfer": null,
            "Heat Transfer Laboratory": null,
            "Design and Analysis of Dynamical Systems": null,
            "Design and Analysis of Dynamical Systems Laboratory": null,
            "Engineering Design Process": null,
            "MechE Senior Design Project II": null,
            "Mechatronics": null,
            "Intermediate Fluid Mechanics": null,
            "Introduction to Biophotonics": null,
            "Additive Manufacturing": null,
            "Space Vehicle Dynamics & Control": null,
            "Locomotion I:  Mechanics": null,
            "Image Processing and Data Visualization": null,
            "Undergraduate Research": null,
            "Group Undergraduate Research": null,
            "Undergrad Independent Study": null,
            "MSE Graduate Research": null,
            "Master's Thesis Research and Writing": null,
            "Mechanics of Solids and Materials II": null,
            "Experimental Fluid Dynamics": null,
            "Master's Design Project II": null,
            "Introduction to Linear Systems Theory": null,
            "Fabricatology - Advanced Materials Processing": null,
            "Fluid Dynamics II": null,
            "Intermediate Fluid Mechanics (graduate)": null,
            "Convection": null,
            "Plasticity": null,
            "Kinematics": null,
            "Robot Devices, Kinematics, Dynamics, and Control": null,
            "Additive Manufacturing (Graduate)": null,
            "Robot Motion Planning": null,
            "Locomotion I:  Mechanics": null,
            "Nonlinear Control and Planning in Robotics": null,
            "Robot System Programming": null,
            "Hydrodynamic Stability": null,
            "Fracture Mechanics": null,
            "Computational Fluid Dynamics": null,
            "Independent Study": null,
            "PhD Graduate Research": null,
            "Mechanical Engineering Seminar": null,
            "Graduate Seminar in Fluid Mechanics": null,
            "Mechanics and Materials Graduate Seminar": null,
            "Matlab Made Easy": null,
            "Introduction to Chemical & Biological Process Analysis": null,
            "Engr Thermodynamics": null,
            "Applied Physical Chemistry": null,
            "Chemical Engineering Modeling and Design for Sophomores": null,
            "Kinetic Processes": null,
            "Transport Phenomena I": null,
            "Transport Phenomena II": null,
            "Chemical & Biomolecular Separation": null,
            "Cell Biology for Engineers": null,
            "Product Design Part 1": null,
            "Product Design Part 2": null,
            "ChemBE Product Design": null,
            "Process Design with Aspen": null,
            "Chemical Engineering Modeling and Design for Juniors": null,
            "Project in Design: Pharmacokinetics": null,
            "Colloids and Nanoparticles": null,
            "Dynamic Modeling and Control": null,
            "Computational Protein Structure Prediction and Design": null,
            "Projects in the Design of a Chemical Car": null,
            "Project in Design: Pharmacodynamics": null,
            "Introduction to Polymeric Materials": null,
            "Supramolecular Materials and Nanomedicine": null,
            "Application of Molecular Evolution to Biotechnology": null,
            "Eukaryotic Cell Biotechnology": null,
            "Polymer Physics": null,
            "Engineering Principles of Drug Delivery": null,
            "Introduction to Nonlinear Dynamics and Chaos": null,
            "Introduction to Chemical Process Safety": null,
            "Independent Study": null,
            "Independent Research": null,
            "Group Undergraduate Research": null,
            "Chemical Engineering Seminar": null,
            "Colloids and Nanoparticles": null,
            "Transport Phenomena in Practice": null,
            "Chemical & Biomolecular Separation": null,
            "Computational Protein Structure Prediction and Design": null,
            "Project in Design: Pharmacodynamics": null,
            "Introduction to Polymeric Materials": null,
            "Supramolecular Materials and Nanomedicine": null,
            "Kinetic Processes": null,
            "Project in Design: Pharmacokinetics": null,
            "Special Topics in Thermodynamics": null,
            "Software Carpentry": null,
            "Application of Molecular Evolution to Biotechnology": null,
            "Advanced Topics in Pharmacokinetics and Pharmacodynamics I": null,
            "Polymer Physics": null,
            "Thermodynamic Independent Study": null,
            "Engineering Principles of Drug Delivery": null,
            "Introduction to Nonlinear Dynamics and Chaos": null,
            "Advanced Chemical Reaction Engineering in Practice": null,
            "Chemical and Biomolecular Engineering Design": null,
            "Chemical Engineering Modeling and Design for Graduate Students": null,
            "Graduate Research": null,
            "Statistical Analysis I": null,
            "Statistical Analysis II": null,
            "Discrete Mathematics": null,
            "Probability and Statistics for the Life Sciences": null,
            "Linear Algebra and Differential Equations": null,
            "Probability & Statistics for the Physical and Information Sciences & Engineering": null,
            "Probability and Statistics for the Biological Sciences and Engineering": null,
            "Introduction to Optimization II": null,
            "Cryptology and Coding": null,
            "Scientific Computing: Differential Equations": null,
            "Introduction to Research": null,
            "Research and Design in Applied Mathematics: Data Mining": null,
            "Applied Statistics and Data Analysis II": null,
            "Introduction to Probability": null,
            "Introduction to Stochastic Processes": null,
            "Stochastic Processes and Applications to Finance II": null,
            "Introduction to Statistics": null,
            "Data Mining": null,
            "Time Series Analysis": null,
            "Equity Markets and Quantitative Trading": null,
            "Interest Rate and Credit Derivatives": null,
            "Quantitative Portfolio Theory and Performance Analysis": null,
            "Computational Molecular Medicine": null,
            "Mathematical Game Theory": null,
            "Deep Learning in Discrete Optimization": null,
            "Graph Theory": null,
            "Mathematical Biology": null,
            "Mathematical Image Analysis": null,
            "Undergraduate Research": null,
            "Undergraduate Independent Study": null,
            "Group Undergraduate Research": null,
            "Undergraduate Internship": null,
            "Introduction to Research": null,
            "Research and Design in Applied Mathematics: Data Mining": null,
            "Applied Statistics and Data Analysis II": null,
            "Introduction to Probability": null,
            "Introduction to Stochastic Processes": null,
            "Stochastic Processes and Applications to Finance II": null,
            "Introduction to Statistics": null,
            "Data Mining": null,
            "Time Series Analysis": null,
            "Equity Markets and Quantitative Trading": null,
            "Interest Rate and Credit Derivatives": null,
            "Quantitative Portfolio Theory and Performance Analysis": null,
            "Computational Molecular Medicine": null,
            "Mathematical Game Theory": null,
            "Deep Learning in Discrete Optimization": null,
            "Graph Theory": null,
            "Mathematical Biology": null,
            "Mathematical Image Analysis": null,
            "Master's Research": null,
            "Probability Theory II": null,
            "Introduction to Stochastic Calculus": null,
            "Statistical Theory II": null,
            "Advanced Topics in Bayesian Statistics": null,
            "Machine Learning": null,
            "Commodity Markets and Trade Finance": null,
            "Nonlinear Optimization II": null,
            "Modeling, Simulation, and Monte Carlo": null,
            "Combinatorial Optimization": null,
            "Reliability Analysis": null,
            "Turbulence Theory II": null,
            "Introduction to Control Theory and Optimal Control": null,
            "Dissertation Research": null,
            "Department Seminar": null,
            "Graduate Independent Study": null,
            "Financial Mathematics Masters Seminar": null,
            "Perspectives on the Evolution of Structures": null,
            "Dynamics": null,
            "Solid Mechanics & Theory of Structures": null,
            "Civil Engineering Undergraduate Research Laboratory": null,
            "Structural Design II": null,
            "Foundation Design": null,
            "Probability & Statistics for Engineers": null,
            "Preservation Engineering II: Theory and Practice": null,
            "Structural Fire Engineering": null,
            "Operations Research": null,
            "Civil Engineering Design II": null,
            "Natural Disaster Risk Modeling": null,
            "Civil Engineering Seminar I": null,
            "Civil Engineering Seminar II": null,
            "Civil Engineering Seminar III": null,
            "Civil Engineering Seminar IV": null,
            "Applied Math for Engineers": null,
            "Structural Dynamics": null,
            "Preservation Engineering II:  Theory and Practice": null,
            "Structural Fire Engineering": null,
            "Lateral Forces: Analysis and Design of Building Structures": null,
            "Preservation Engineering in the Urban Context": null,
            "Operations Research": null,
            "Natural Disaster Risk Modeling": null,
            "Civil Engineering Graduate Seminar": null,
            "Optimization and Learning": null,
            "Mechanics of Architected Materials": null,
            "Non-Linear Finite Elements": null,
            "Introduction to Engineering for Sustainable Development": null,
            "Emerging Environmental Issues": null,
            "Environmental Engineering Laboratory": null,
            "Microbial Ecology": null,
            "Engineering Microeconomics": null,
            "Data Analytics in Environmental Health and Engineering": null,
            "Air Pollution": null,
            "Environmental Engineering Design II": null,
            "Problems in Applied Economics": null,
            "Collaborative Modeling for Resolving Water Resources Disputes": null,
            "Environmental Inorganic Chemistry": null,
            "Biological Process of Wastewater Treatment": null,
            "Physical and Chemical Processes II": null,
            "Social Theory for Engineers": null,
            "Experimental Methods in Environmental Engineering and Chemistry": null,
            "Geostatistics: Understanding Spatial Data": null,
            "Applied Economics & Finance": null,
            "Hazardous Waste Engineering and Management": null,
            "Wolman Seminar - Undergraduates": null,
            "Urban and Environmental Systems": null,
            "Undergraduate Research": null,
            "Financial Market Research": null,
            "Undergraduate Independent Study": null,
            "Energy Policy and Planning Models": null,
            "Microbial Ecology": null,
            "Data Analytics in Environmental Health and Engineering": null,
            "Collaborative Modeling for Resolving Water Resources Disputes": null,
            "Environmental Inorganic Chemistry": null,
            "Hydrologic Transport in the Envir": null,
            "Physical and Chemical Processes II": null,
            "Seminar on Critical Zone Science": null,
            "Experimental Methods in Environmental Engineering and Chemistry": null,
            "Geostatistics: Understanding Spatial Data": null,
            "Air Pollution": null,
            "Hazardous Waste Engineering and Management": null,
            "Urban and Environmental Systems": null,
            "Masters Independent Study": null,
            "Doctoral Research": null,
            "Master's Research": null,
            "Wolman Seminar- Graduates": null,
            "Environment & Energy Systems Seminar": null,
            "Environmental Engineering Seminar": null,
            "BME Design Group": null,
            "BME Design Group": null,
            "Killer Design: Maximizing Safety in the Design Process": null,
            "Introduction to Human Physiology": null,
            "Neuro Data Design II": null,
            "Biological Models and Simulations": null,
            "Nonlinear Dynamics of Biological Systems": null,
            "Systems and Controls": null,
            "Systems Biology of the Cell": null,
            "Advanced Design Team: Instrumentation": null,
            "BME Design Group": null,
            "Design Team Leader Seminar": null,
            "BME Design Group": null,
            "Design Team, Team Leader Seminar": null,
            "Principles of Pulmonary Physiology": null,
            "Systems Bioengineering II": null,
            "Systems Bioengineering Lab": null,
            "Systems Pharmacology and Personalized Medicine": null,
            "Applied Bioelectrical Engineering I": null,
            "Applied Bioelectrical Engineering II": null,
            "Neuro Data Design II": null,
            "Biomedical Applications of Glycoengineering": null,
            "Physical Epigenetics": null,
            "Computational Stem Cell Biology": null,
            "Cell and Tissue Engineering Lab": null,
            "Methods in Nucleic Acid Sequencing": null,
            "Introduction to Rehabilitation Engineering: Design Lab": null,
            "Introduction to Data Science for Biomedical Engineering": null,
            "Precision Care Medicine II": null,
            "Foundations of Computational Biology and Bioinformatics": null,
            "Imaging Instrumentation": null,
            "Build an Imager": null,
            "Adv. Design Projects: Instrumentation": null,
            "Biomedical Engineering Undergraduate Research": null,
            "Biomedical Engineering Group Undergraduate Research": null,
            "Advanced Focus Area Research: Regenerative and Immune Engineering": null,
            "Advanced Focus Area Research: Computation Medicine": null,
            "Advanced Focus Area Research: Biomedical Data Science": null,
            "Advanced Focus Area Research: Imaging and Instrumentation": null,
            "Advanced Focus Area Research: Neuroengineering": null,
            "Advanced Focus Area Research: Genomics and Systems Biology": null,
            "Honors Instrumentation": null,
            "Senior Design Project": null,
            "Senior Design Project": null,
            "Special Topics in Bioengineering Innovation & Design": null,
            "BME Teaching Practicum": null,
            "Medical Device Design and Innovation": null,
            "Principles and Practice of Global Health Innovation and Design": null,
            "Applied Bioelectrical Engineering I": null,
            "Applied Bioelectrical Engineering II": null,
            "Neuro Data Design II": null,
            "Systems Pharmacology and Personalized Medicine": null,
            "Biomedical Applications of Glycoengineering": null,
            "Computational Stem Cell Biology": null,
            "Introduction to Data Science for Biomedical Engineering": null,
            "Introduction to Neuro-Image Processing": null,
            "X-ray Imaging and Computed Tomography": null,
            "Precision Care Medicine": null,
            "Foundations of Computational Biology and Bioinformatics": null,
            "Imaging Instrumentation": null,
            "CBID Masters Advanced Project": null,
            "Mathematical Foundations of BME I": null,
            "Systems Bioengineering II": null,
            "Advanced Seminars in Computational Medicine": null,
            "Distinguished Seminar Series in Computational Medicine": null,
            "Advanced Seminars in Cardiac Electrophysiology and Mechanics": null,
            "Neural Implants and Interfaces": null,
            "Imaging Science Seminar": null,
            "Surgineering: Systems Engineering and Data Science in Interventional Medicine": null,
            "Advanced Topics in Regenerative and Immune Engineering": null,
            "Cell and Tissue Engineering Lab Advanced Project": null,
            "Cell & Tissue Engineering Lab": null,
            "Biomedical Engineering Seminar": null,
            "Research in Biomedical Engineering": null,
            "Applied Research and Grant Methodology II": null,
            "BME MSE Research Practicum": null,
            "Computer Ethics": null,
            "M & Ms: Freshman Experience": null,
            "Intermediate Programming": null,
            "Data Structures": null,
            "Computer System Fundamentals": null,
            "Automata & Computation Theory": null,
            "User Interfaces and Mobile Applications": null,
            "Developing Health IT Applications": null,
            "Parallel Programming": null,
            "Seminar: Computer Integrated Surgery II": null,
            "Deep Learning Lab": null,
            "Digital Health and Biomedical Informatics": null,
            "Computer Science Innovation & Entrepreneurship II": null,
            "Computer Networks": null,
            "Cloud Computing": null,
            "Parallel Programming": null,
            "Principles of Programming Languages": null,
            "Intro Algorithms": null,
            "Approximation Algorithms": null,
            "Blockchains and Cryptocurrencies": null,
            "Network Security": null,
            "Computational Genomics: Data Analysis": null,
            "Augmented Reality": null,
            "Computer Integrated Surgery II": null,
            "Algorithms for Sensor-Based Robotics": null,
            "Artificial Intelligence": null,
            "Information Retrieval and Web Agents": null,
            "Machine Learning": null,
            "Machine Learning: Data to Models": null,
            "Machine Learning: Deep Learning": null,
            "Human-Robot Interaction": null,
            "Computer Science Workshop": null,
            "Independent Study": null,
            "Undergraduate Research": null,
            "Computer Science Internship": null,
            "Senior Honors Thesis": null,
            "Computer Science Innovation & Entrepreneurship II": null,
            "Computer Networks": null,
            "Cloud Computing": null,
            "Parallel Programming": null,
            "Principles of Programming Languages": null,
            "Theory of Computation": null,
            "Intro Algorithms": null,
            "Approximation Algorithms": null,
            "Blockchains and Cryptocurrencies": null,
            "Network Security": null,
            "Computational Genomics: Data Analysis": null,
            "Augmented Reality": null,
            "Computer Integrated Surgery II": null,
            "Algorithms for Sensor-Based Robotics": null,
            "Artificial Intelligence": null,
            "Information Retrieval and Web Agents": null,
            "Machine Learning": null,
            "Machine Learning: Data to Models": null,
            "Machine Learning: Deep Learning": null,
            "Human-Robot Interaction": null,
            "Advanced Topics in Computer Security": null,
            "Advanced Topics in Applied Cryptography": null,
            "Computational Genomics: Applied Comparative Genomics": null,
            "FFT in Graphics & Vision": null,
            "Machine Learning: Linguistic & Sequence Modeling": null,
            "Vision as Bayesian Inference": null,
            "Computer Science Seminar": null,
            "Masters Research": null,
            "Graduate Independent Study": null,
            "Teaching Practicum": null,
            "PhD Research": null,
            "Selected Topics in Systems Research": null,
            "Selected Topics in Programming Languages": null,
            "CS Theory Seminar": null,
            "Seminar: Medical Image Analysis": null,
            "Selected Topics in Computer Graphics": null,
            "Selected Topics in Natural Language Processing": null,
            "Selected Topics in Meaning, Translation and Generation of Text": null,
            "Selected Topics in Machine Translation": null,
            "Ethical Hacking": null,
            "Moral & Legal Foundations of Privacy": null,
            "Financial Issues in Managing a Secure Operation": null,
            "Computer Intrusion Detection": null,
            "Cybersecurity Risk Management": null,
            "Advanced Computer Forensics": null,
            "Information Security Projects": null,
            "Information Security Independent Study": null,
            "Introduction to Business": null,
            "Clark Scholars Leadership Challenge": null,
            "Principles of Finance": null,
            "Financial Accounting": null,
            "Principles of Marketing": null,
            "Managerial Finance": null,
            "Managerial Accounting": null,
            "Business Law I": null,
            "Product Marketing for ChemBe": null,
            "Case Studies in Business Ethics": null,
            "Law and the Internet": null,
            "Leading Teams": null,
            "Leadership Theory": null,
            "Leading Change": null,
            "Principles of Management": null,
            "Business Process and Quality Management": null,
            "Operations Management": null,
            "New Product Development": null,
            "Engineering Business and Management": null,
            "Clark Scholar Engineering Design II": null,
            "Computer Science Innovation and Entrepreneurship": null,
            "Corporate Strategy and Business Failure": null,
            "Marketing Strategy": null,
            "Advertising & Integrated Marketing Communication": null,
            "Social Media and Marketing": null,
            "Entrepreneurial Opportunities in Sustainable Living": null,
            "Entrepreneurial Spirits": null,
            "Business Internship": null,
            "Professional Writing and Communication": null,
            "Professional Writing and Communication for International Students": null,
            "Improvisational Techniques for Communication": null,
            "Oral Presentations": null,
            "Oral Presentations for International Students": null,
            "Writing for the Law": null,
            "Special Topics in Professional Writing: Freelance Magazine Writing": null,
            "Culture of the Engineering Profession": null,
            "Culture of the Media Profession": null,
            "Culture of the Medical Profession": null,
            "Improv for Science, Technology and Industry": null,
            "Visual Rhetoric": null,
            "Business Analytics": null,
            "Advanced Communication for International Students: Applied Mathematics and Statistics Masters": null,
            "MSEM Seminar": null,
            "Storytelling with Data": null,
            "Professional Presentations for Graduate Students": null,
            "Improvisation for Enhanced Teamwork and Communication": null,
            "Business Creation and Contracts": null,
            "Intellectual Property Law": null,
            "Regulatory Writing": null,
            "Improvisation for Communication": null,
            "Writing Grant and Contract Proposals": null,
            "Improving Presentation Skills for International Students": null,
            "Writing Articles and Technical Reports": null,
            "Improving Presentation Skills for Scientists and Engineers": null,
            "The Entrepreneurial Cycle and Developing Effective Business Plans": null,
            "Emotional and Cultural Competency": null,
            "Innovation and Entrepreneurship": null,
            "Innovation and Entrepreneurship II": null,
            "Managing People and Resolving Conflicts": null,
            "Managing Personal Finances": null,
            "Project Management": null,
            "Leading Change": null,
            "Management and Technology Consulting": null,
            "Leading Teams in Virtual, International and Local Settings": null,
            "Fundamentals of Management": null,
            "Communicating in a Crisis": null,
            "Demand Discovery: Finding and Creating Customer Value": null,
            "Global Consulting": null,
            "INBT Undergraduate Research": null,
            "INBT Research Practicum": null,
            "Introduction to NanoBio Tutorials II": null,
            "NanoBio Laboratory": null,
            "Advanced NanoBio Tutorials II": null,
            "NanoBio Tutorials: Special Topics I": null,
            "NanoBio Tutorials II": null,
            "Nanotechnology for Cancer Research Tutorial": null,
            "Independent Study: Global Engineering Innovation": null,
            "Doctor of Engineering Fundamentals": null,
            "Doctor of Engineering Research Proposal": null,
            "Doctor of Engineering Research": null,
            "Non-Resident Status": null
		},
    });
});

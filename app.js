const express = require('express');
const app = express();

app.use(express.json());             
app.use(express.urlencoded()); 


let students = [
    {studentId: 220344642, studentName : "LidongWu", course : "Bachelor of IT", major : "App development"},
    {studentId: 123456789, studentName : "Abc", course : "Bachelor of IT", major : "App development"},
    {studentId: 456788123, studentName : "FDF", course : "Bachelor of IT", major : "App development"},
]// Set the instances we gonna use

app. get('/students', (req,res) => {
    res.json(students);
})// http://localhost:3000/users get the instances which is also an array

app.get('/students:studentId', function(req,res){
    console.log("Student ID " + req.params.studentId + " requested");
    var id = req.params.studentId;
    var studentFound = false;
    students.forEach((student, i, array) => {
        if (student.studentId == id) {
            res.send(students[i]);
            studentFound = true;
        }
    });
    if (studentFound == false) {
        res.send("ERROR: Student with ID " + id + " does not exist");
    }
})// Find the specified student by their unique identification, if the student is not found, we pop up an error.

app.post('/students', (req,res)=>{
    if (req.body == undefined){
        console.log("ERROR: req.body is undefined");
        res.status(400).send("ERROR: req.body is undefined");
    }
    else {
        newStudentData = JSON.stringify(req.body);
        console.log("Adding new user with data: " + newStudentData);

        const newStudent = req.body; 
        students.push(newStudent); 
        res.status(201).json(newStudent); 
    }
})// Add a new student to the students array. First we need to get the details of the student, and push the student to the students array.


app.put('/students:studentId', function(req,res){
    const Id = parseInt(req.params.id); 
    console.log("Update user with ID: " + req.params.id);

    const updatedStudent = req.body; 

    students = students.map(student => student.studentId === Id ? updatedStudent : student); 
    res.status(200).json(updatedStudent); 
})// Update the student's details and locate them by their id, we use if statement(if targetID == specifiedId).


app.delete('/students/:studentId', (req, res) => { 
    const id = parseInt(req.params.id);

    students = students.filter(student => student.studentId !== id); 
    res.status(204).send(); 
  }); //Delete the target student from the students array, locate them by their id.
  //We use filter to delete the student, and then, re-render.

app.listen(3000, console.log('App Listening to port 3000'));
//By LidongWu


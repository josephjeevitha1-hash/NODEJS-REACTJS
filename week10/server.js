const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
let students = [];

// GET - View students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// POST - Add student
app.post("/api/students", (req, res) => {

    students.push(req.body);

    res.json({
        message: "Student added"
    });
});

// PUT - Update student
app.put("/api/students/:id", (req, res) => {

    let id = Number(req.params.id);

    let student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;

    res.json({
        message: "Student updated"
    });
});

// DELETE - Delete student
app.delete("/api/students/:id", (req, res) => {

    let id = Number(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});



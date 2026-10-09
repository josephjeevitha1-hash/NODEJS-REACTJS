const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const secretKey = "mysecretkey";


// Student data
let students = [
    { id: 1, name: "Rahul", age: 20 },
    { id: 2, name: "Priya", age: 21 }
];


// Login
app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username === "admin" && password === "1234") {

        const token = jwt.sign(
            { username: username },
            secretKey,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } else {

        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});


// JWT Authentication Middleware
function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Token required");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (error, user) => {

        if (error) {
            return res.status(403).send("Invalid token");
        }

        req.user = user;
        next();
    });
}


// GET students
app.get("/students", authenticateToken, (req, res) => {

    res.json(students);

});


// ADD student
app.post("/students", authenticateToken, (req, res) => {

    const student = req.body;

    students.push(student);

    res.json({
        message: "Student added successfully",
        students: students
    });

});


// UPDATE student
app.put("/students/:id", authenticateToken, (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.json({
        message: "Student updated successfully",
        student: student
    });

});


// DELETE student
app.delete("/students/:id", authenticateToken, (req, res) => {

    const id = parseInt(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully",
        students: students
    });

});


app.listen(3000, () => {

    console.log("Server running on http://localhost:3000");

});

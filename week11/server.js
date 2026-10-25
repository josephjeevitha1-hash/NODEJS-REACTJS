
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

    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {

        const token = jwt.sign(
            { username: username },
            secretKey,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token: token
        });
    }

    res.status(401).json({
        message: "Invalid username or password"
    });
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Token required");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (error, user) => {

        if (error) {
            return res.status(403).send("Invalid or expired token");
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

    const { id, name, age } = req.body;

    if (id == null || !name || age == null) {
        return res.status(400).send("ID, name and age are required");
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).send("ID must be a positive integer");
    }

    if (!Number.isFinite(Number(age)) || Number(age) < 0) {
        return res.status(400).send("Age must be a valid non-negative number");
    }

    if (students.some(s => s.id === Number(id))) {
        return res.status(409).send("Student ID already exists");
    }

    const student = {
        id: Number(id),
        name: name,
        age: Number(age)
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});

// UPDATE student
app.put("/students/:id", authenticateToken, (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    const { name, age } = req.body;

    if (!name || age == null) {
        return res.status(400).send("Name and age are required");
    }

    if (!Number.isFinite(Number(age)) || Number(age) < 0) {
        return res.status(400).send("Age must be a valid non-negative number");
    }

    student.name = name;
    student.age = Number(age);

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE student
app.delete("/students/:id", authenticateToken, (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully",
        students: students
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

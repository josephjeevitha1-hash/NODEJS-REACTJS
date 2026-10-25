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

    res.status(401).send("Invalid username or password");
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

    // Check duplicate student ID
    if (students.some(s => s.id === Number(id))) {
        return res.status(409).send("Student ID already exists");
    }

    students.push({
        id: Number(id),
        name: name,
        age: Number(age)
    });

    res.send("Student added successfully");
});


// UPDATE student
app.put("/students/:id", authenticateToken, (req, res) => {

    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.name = req.body.name;
    student.age = Number(req.body.age);

    res.send("Student updated successfully");
});

// DELETE student
app.delete("/students/:id", authenticateToken, (req, res) => {

    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send("Student not found");
    }

    students = students.filter(
        s => s.id !== Number(req.params.id)
    );

    res.send("Student deleted successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

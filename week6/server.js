const fs = require("fs");

// ========================================
// 1. WRITE - Create student data
// ========================================

function writeStudent() {

    let students = [
        {
            rollNo: 101,
            name: "Ravi",
            branch: "CSE",
            marks: 85
        },
        {
            rollNo: 102,
            name: "Priya",
            branch: "AIML",
            marks: 90
        }
    ];

    fs.writeFile(
        "students.json",
        JSON.stringify(students,null, 2),
        (err) => {

            if (err) throw err;

            console.log("Student data written successfully");
        }
    );
}

// ========================================
// 2. READ - Read student data
// ========================================

function readStudent() {

    fs.readFile("students.json", "utf8", (err, data) => {

        if (err) throw err;

        let students = JSON.parse(data);

        console.log("Student Data:");
        console.log(students);
    });
}

// ========================================
// 3. ADD - Add a new student
// ========================================

function addStudent() {

    fs.readFile("students.json", "utf8", (err, data) => {

        if (err) throw err;

        let students = JSON.parse(data);

        let newStudent = {
            rollNo: 103,
            name: "Arun",
            branch: "DS",
            marks: 88
        };

        students.push(newStudent);

        fs.writeFile(
            "students.json",
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) throw err;

                console.log("New student added successfully");
            }
        );
    });
}

// ========================================
// 4. UPDATE - Update existing student
// ========================================

function updateStudent() {

    fs.readFile("students.json", "utf8", (err, data) => {

        if (err) throw err;

        let students = JSON.parse(data);

        students.forEach(student => {

            if (student.rollNo === 101) {
                student.branch = "AIML";
                student.marks = 95;
            }

        });

        fs.writeFile(
            "students.json",
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) throw err;

                console.log("Student data updated successfully");
            }
        );
    });
}

// ========================================
// 5. DELETE - Delete a student
// ========================================

function deleteStudent() {

    fs.readFile("students.json", "utf8", (err, data) => {

        if (err) throw err;

        let students = JSON.parse(data);

        students = students.filter(student => student.rollNo !== 102);

        fs.writeFile(
            "students.json",
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) throw err;

                console.log("Student deleted successfully");
            }
        );
    });
}

// ========================================
// EXECUTE ONE OPERATION AT A TIME
// ========================================

 //writeStudent();
//readStudent();
 //addStudent();
 //updateStudent();
//deleteStudent();


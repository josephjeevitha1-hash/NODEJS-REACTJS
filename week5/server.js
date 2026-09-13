const mysql = require("mysql2");
const readline = require("readline");

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your password",
    database: "college"
});

// Keyboard input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.log("Connection error:", err);
        return;
    }

    console.log("Connected to MySQL");
    menu();
});


// MENU
function menu() {

    console.log("\n===== STUDENT CRUD =====");
    console.log("1. CREATE");
    console.log("2. READ");
    console.log("3. UPDATE");
    console.log("4. DELETE");
    console.log("5. EXIT");

    rl.question("Enter choice: ", choice => {

        if (choice == 1) {
            create();
        }
        else if (choice == 2) {
            read();
        }
        else if (choice == 3) {
            update();
        }
        else if (choice == 4) {
            del();
        }
        else if (choice == 5) {
            db.end();
            rl.close();
            console.log("Program ended");
        }
        else {
            console.log("Invalid choice");
            menu();
        }
    });
}


// CREATE
function create() {

    db.query(
        "INSERT INTO students(name, age, course) VALUES(?,?,?)",
        ["Joy", 22, "aiml"],
        (err, result) => {

            if (err) {
                console.log("Create error:", err);
                return;
            }

            console.log("Student added");
            menu();
        }
    );
}


// READ
function read() {

    db.query(
        "SELECT * FROM students",
        (err, result) => {

            if (err) {
                console.log("Read error:", err);
                return;
            }

            console.table(result);
            menu();
        }
    );
}


// UPDATE
function update() {

    db.query(
        "UPDATE students SET age=?, course=? WHERE id=?",
        [22, "Data Science", 1],
        (err, result) => {

            if (err) {
                console.log("Update error:", err);
                return;
            }

            console.log("Rows updated:", result.affectedRows);
            menu();
        }
    );
}


// DELETE
function del() {

    db.query(
        "DELETE FROM students WHERE id=?",
        [1],
        (err, result) => {

            if (err) {
                console.log("Delete error:", err);
                return;
            }

            console.log("Rows deleted:", result.affectedRows);
            menu();
        }
    );
}

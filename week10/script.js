// View Students
function loadStudents() {

    fetch("/api/students")
        .then(res => res.json())
        .then(data => {

            let table = document.getElementById("studentTable");

            table.innerHTML = "";

            data.forEach(student => {

                table.innerHTML += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.course}</td>
                        <td>
                            <button onclick="deleteStudent(${student.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });
        });
}


// Add Student
function addStudent() {

    let student = {
        id: Number(document.getElementById("id").value),
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value
    };

    fetch("/api/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);
        loadStudents();

    });
}


// Update Student
function updateStudent() {

    let id = document.getElementById("id").value;

    let student = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value
    };

    fetch("/api/students/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);
        loadStudents();

    });
}


// Delete Student
function deleteStudent(id) {

    fetch("/api/students/" + id, {

        method: "DELETE"

    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);
        loadStudents();

    });
}


// Load students when page opens
loadStudents();


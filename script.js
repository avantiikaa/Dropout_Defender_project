document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return db.collection("users").doc(userCredential.user.uid).set({
                name: name,
                email: email,
                role: role
            });
        })
        .then(() => {
            alert("Signup successful!");
            window.location.href = "index.html"; 
        })
        .catch(error => {
            alert("Signup Error: " + error.message);
        });
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid;
            return db.collection("users").doc(userId).get();
        })
        .then(doc => {
            if (doc.exists) {
                const role = doc.data().role;
                switch (role) {
                    case "teacher":
                        window.location.href = "teacher-dashboard.html";
                        break;
                    case "student":
                        window.location.href = "student-dashboard.html";
                        break;
                    case "parent":
                        window.location.href = "parent-dashboard.html";
                        break;
                    default:
                        alert("Invalid role. Contact admin.");
                }
            } else {
                alert("User data not found!");
            }
        })
        .catch(error => {
            alert("Login Error: " + error.message);
        });
});
function resetForm() {
    document.getElementById("predictionForm").reset();
    document.getElementById("result").innerHTML = "";

    for (let i = 1; i <= 8; i++) {
        document.getElementById(`sem${i}_cgpa`).value = "";
        document.getElementById(`sem${i}_backlog`).value = "";
    }

    document.getElementById("overall_cgpa").value = "";
    document.getElementById("total_backlogs").value = "";
}
document.addEventListener("DOMContentLoaded", function () {
    // Sample Student Data
    const students = [
        { name: "Alice", score: 85 },
        { name: "Bob", score: 78 },
        { name: "Charlie", score: 92 },
        { name: "David", score: 45 },
        { name: "Emma", score: 60 },
    ];

    // Populate Student List
    const studentList = document.getElementById("studentList");
    students.forEach(student => {
        let li = document.createElement("li");
        li.textContent = `${student.name} - ${student.score}%`;
        studentList.appendChild(li);
    });

    // Populate Student Table
    const studentTableBody = document.getElementById("studentTableBody");
    students.forEach(student => {
        let row = studentTableBody.insertRow();
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.score + "%";
        row.insertCell(2).textContent = student.score >= 50 ? "Pass" : "Fail";
    });

    // Bar Chart Data
    const ctx = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: students.map(student => student.name),
            datasets: [{
                label: "Student Scores",
                data: students.map(student => student.score),
                backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
});



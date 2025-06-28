import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

document.getElementById("signupForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;

    if (!role) {
        alert("Please select a role.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: role,
            createdAt: new Date()
        });

        alert("Signup successful! Please login.");
        window.location.href = "login.html"; // Redirects to login page

    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Signup Error:", error);
    }
});





document.getElementById("loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const role = userDoc.data().role;
            alert("Login successful! Redirecting...");
            redirectToDashboard(role);
        } else {
            alert("User data not found. Please sign up again.");
        }

    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Login Error:", error);
    }
});

function redirectToDashboard(role) {
    let page = "";
    switch (role) {
        case "Student":
            page = "student_dashboard.html";
            break;
        case "Teacher":
            page = "teacher_dashboard.html";
            break;
        
        default:
            page = "index.html"; 
    }
    setTimeout(() => {
        window.location.href = page;
    }, 1000); 
}

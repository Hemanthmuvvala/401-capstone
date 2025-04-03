import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


document.getElementById("signup-btn")?.addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Sign-up successful!");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch(error => alert(error.message));
});


document.getElementById("login-btn")?.addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful!");
            localStorage.setItem("user", "true");
            window.location.href = "ai-tools.html"; 
        })
        .catch(error => alert(error.message));
});

// Logout Logic (Inside AI Tools Page)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logout-btn")?.addEventListener("click", () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user"); // Remove session
            window.location.href = "index.html"; // Redirect to login page
        }).catch(error => alert(error.message));
    });

    // Redirect to login if user is not authenticated
    if (window.location.pathname.includes("ai-tools.html") && !localStorage.getItem("user")) {
        window.location.href = "index.html"; // Redirect if not logged in
    }
});

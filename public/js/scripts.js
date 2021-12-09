function validateSignupInputs(e) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const age = Number(document.getElementById("age").value);
    const email = document.getElementById("email").value;
    const confirm_pass = document.getElementById("confirm-password").value;
    let errorMessage = null;
    if (!username) {
        errorMessage = "Username must be present";
    }
    else if (username == null) {
        errorMessage = "Username cannot be null";
    }
    else if (username == undefined) {
        errorMessage = "username not defined";
    }
    else if (username.length < 5 || username.length > 25) {
        errorMessage = "Enter a User Name with more than 4 and less than 15 characters";
    }
    else if (!username.match(/^[a-zA-Z0-9_@\.]+$/)) {
        errorMessage = "Enter a User Name only with valid characters";
    }
    else if (!email) {
        errorMessage = "You must provide a email post";
    }
    else if (email == null || email.length == 0) {
        errorMessage = "email cannot be null";
    }
    else if (email == undefined) {
        errorMessage = "email not defined";
    }
    else if (!validateEmail(email)) {
        errorMessage = "Enter email only with valid characters";
    }
    else if (!age || age == null || age == undefined) {
        errorMessage = "Invalid age parameters";
    }
    else if (typeof age == 'string') {
        errorMessage = "Age should be a number";
    }
    else if (age < 1 || age > 100) {
        errorMessage = "Invalid age";
    }
    else if (!password) {
        errorMessage = "You must provide a password post";
    }
    else if (password == null) {
        errorMessage = "password cannot be null";
    }
    else if (password == undefined) {
        errorMessage = "password not defined";
    }
    else if (password.length < 6 || password.length > 20) {
        errorMessage = "Enter a password with more than 6 and less than 20 characters";
    }
    else if (!password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else if (!confirm_pass) {
        errorMessage = "You must provide a confirm password";
    }
    else if (confirm_pass == null) {
        errorMessage = "confirm password cannot be null";
    }
    else if (confirm_pass == undefined) {
        errorMessage = "confirm password not defined";
    }
    else if (confirm_pass != password) {
        errorMessage = "password and confirm password do not match.";
    }

    else {
        errorMessage = null;
    }

    if (errorMessage == null) {
        return true;
    }
    else {
        e.preventDefault();
        alert(errorMessage);
        return false;
    }
}

function validateEmail(email) {
    const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (email.match(regexEmail)) {
        return true;
    }
    else {
        return false;
    }
}
async function validateSignInInputs(e) {
    e.preventDefault();
    const validAdminUsernames = ["admin", "admin2021"];
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let errorMessage = null;
    if (!username) {
        errorMessage = "Username must be present";
    }
    else if (username == null) {
        errorMessage = "Username cannot be null";
    }
    else if (username == undefined) {
        errorMessage = "username not defined";
    }
    else if (username.length < 5 || username.length > 25) {
        errorMessage = "Enter a User Name with more than 4 and less than 15 characters";
    }
    else if (!username.match(/^[a-z0-9_@\.]+$/)) {
        errorMessage = "Enter a User Name only with valid characters";
    }
    else if (username.includes("admin") && !validAdminUsernames.includes(username)) {
        errorMessage = "Not a valid admin Username";
    }
    else if (!password) {
        errorMessage = "You must provide a password post";
    }
    else if (password == null) {
        errorMessage = "password cannot be null";
    }
    else if (password == undefined) {
        errorMessage = "password not defined";
    }
    else if (password.length < 6 || password.length > 20) {
        errorMessage = "Enter a password with more than 6 and less than 20 characters";
    }
    else if (!password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else {
        errorMessage = null;
    }

    if (errorMessage == null) {
        let res = await postLoginData();
        if (res.status == true) {
            window.location.href = "/";
        }
        else {
            document.getElementById("error-div").style.display = "block";
            document.getElementById("error-line").innerText = res.error;
        }
    }
    else {
        alert(errorMessage);
    }
    return false;
}

function validateUpdateProfileInputs(e) {
    const password = document.getElementById("password").value;
    const confirm_pass = document.getElementById("confirm-password").value;
    const age = Number(document.getElementById("age").value);
    const email = document.getElementById("email").value;
    let errorMessage = null;
    if (!email) {
        errorMessage = "You must provide a email post";
    }
    else if (email == null || email.length == 0) {
        errorMessage = "email cannot be null";
    }
    else if (email == undefined) {
        errorMessage = "email not defined";
    }
    else if (!validateEmail(email)) {
        errorMessage = "Enter email only with valid characters";
    }
    else if (!age || age == null || age == undefined) {
        errorMessage = "Invalid age parameters";
    }
    else if (typeof age == 'string') {
        errorMessage = "Age should be a number";
    }
    else if (age < 1 || age > 100) {
        errorMessage = "Invalid age";
    }
    else if (password && password.length < 6 || password.length > 20) {
        errorMessage = "Enter a password with more than 6 and less than 20 characters";
    }
    else if (password && !password.match(/^(?!\s*$).+/)) {
        errorMessage = "Enter password only with valid characters";
    }
    else if (!confirm_pass) {
        errorMessage = "You must provide a confirm password";
    }
    else if (confirm_pass == null) {
        errorMessage = "confirm password cannot be null";
    }
    else if (confirm_pass == undefined) {
        errorMessage = "confirm password not defined";
    }
    else if (confirm_pass != password) {
        errorMessage = "password and confirm password do not match.";
    }
    else {
        errorMessage = null;
    }

    if (errorMessage == null) {
        return true;
    }
    else {
        e.preventDefault();
        alert(errorMessage);
        return false;
    }
}
async function postLoginData() {
    const response = await fetch("/users/login", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: document.getElementById("username").value, password: document.getElementById("password").value })
    });
    return await response.json();
}
function likeDislikeAReview(x) {
    x.classList.toggle("fa-thumbs-down");
}

function confirmAccountDeletion() {
    let r = confirm("Are you sure?");
    if (r == true) {
        window.location.href = '/users/remove_profile';
    }
}
function goToDiscussion(e) {
    e.preventDefault();
    let epno = Number(document.getElementById("epno_dis").value);
    if (epno <= 0) {
        alert("Invalid episode no");
        return;
    }
    window.location.href = `/anime/discussion/${document.getElementById("anime_id_dis").value}/${document.getElementById("epno_dis").value}`;
    return false;
}
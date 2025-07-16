/*!
 * eduPortal - All Rights Reserved
 * Copyright 2025 Anugya Mehrotra • eduPortal
 *
 * This software is proprietary and may not be copied, modified, or distributed
 * without express written permission. For reference only.
 * https://eduportalhost.neocities.org/eduPortal_main_page
 */


// LOGIN FUNCTION HANDLER
    // FUNCTION: TO HANDLE LOGIN CREDENTIALS AND REDIRECT ON SUCCESS (W/O ONCLICK EVENT)


// LOGIN FUNCTION
    // FUNCTION: TO CHECK CREDENTIALS AND REDIRECT ON SUCCESS
function loginFunction(loginPageForm) {

    const usernameInput = document.getElementById("usernameInputVar").value;
    const passwordInput = document.getElementById("passwordInputVar").value;


    // USER LOGIN CREDENTIALS --> SECURE USING EXTERNAL DATABASE IN FUTURE
    const usernameValues = ["admin1", "admin2", "admin3", "admin4"];
    const passwordValues = ["pass1", "pass2", "pass3", "pass4"];

    let loginSuccess = false;

    // CONFIRMING CREDENTIALS OF REGISTERED USERS
    for (let i = 0; i < usernameValues.length; i++) {
        if (usernameInput && passwordInput && usernameInput.toLowerCase() === usernameValues[i].toLowerCase() && passwordInput === passwordValues[i]) {
            loginSuccess = true;

            localStorage.setItem("loggedInTeacherKey", usernameInput);
            alert(`Welcome ${usernameInput}! You are now logged in as a teacher.`);

            break;
        }
    }

    // LOGIN SUCCESS HANDLER REDIRECT
    if (loginSuccess) {
        alert("Login Successful");
        window.location.href = "eduPortal_main_page.html";  // REDICRT TO MAIN PAGE LATER
    } else {
        alert("Invalid credentials!");
    }

}

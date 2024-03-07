document.getElementById("Login").addEventListener("submit", function(event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Get form inputs
    var email = document.getElementById("email").value;
    var pword = document.getElementById("pword").value;

    // Perform validation
    var feedback = document.getElementById("feedback");
    feedback.innerText = ""; 
    feedback.style.color = ""; 

    var valid = true;

    if (validateEmail(email, feedback) === false) 
    {
        valid = false;
    } 
    else if (validatePassword(pword, feedback) === false) 
    {
        valid = false;
    }

    if (valid) 
    {
       
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) 
            {
                // If login successful, redirect
                window.location.href = response.redirectURL;
            } 
            else 
            {
                // If login failed, display error message
                feedback.innerHTML = response.message;
                feedback.style.color = "red";
            }
        };

        xhr.onerror = function() {
            
            feedback.innerHTML = "An error occurred. Please try again later.";
            feedback.style.color = "red";
        };

        // Send the request with email and password
        xhr.send(JSON.stringify({ email: email, pword: pword }));
    }
});

function validateEmail(email, feedback) {
    var valid = true;
    if (email == null || email === "") 
    {
        feedback.innerHTML += "\n*Email address is empty.";
        feedback.style.color = "red";
        valid = false;
    }
    return valid;
}

function validatePassword(pword, feedback) {
    var valid = true;
    if (pword == null || pword === "") 
    {
        feedback.innerHTML += "\n*Password is empty.";
        feedback.style.color = "red";
        valid = false;
    }
    return valid;
}

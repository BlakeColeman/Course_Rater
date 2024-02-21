document.getElementById("SignUp").addEventListener("submit", function(event) {
   // Prevent the form from submitting by default
    
    // Get form inputs
    var uname = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    var pword = document.getElementById("spword").value;
    var cpword = document.getElementById("cpword").value;
    
    //Regex FORM
    var RegexEmail = /^[\w]+@uregina.ca$/i;
    var RegexPword = /^\W*\w*\W+/;

    // Perform validation
    var feedback = document.getElementById("feedback");
    feedback.innerText = ""; // Clear previous feedback
    feedback.style.color = ""; // Reset color
    
   
    if(uname == null || uname == "") {
		feedback.innerHTML = "*Username is empty.";
        feedback.style.color = "red";
        event.preventDefault();
        return;
	}	else if (email.length > 40) {
    	feedback.innerHTML = "*Username address too long. Maximum is 40 characters.";
        feedback.style.color = "red";
        event.preventDefault();
        return;
  	}

    if(email == null || email == "") {
		feedback.innerHTML = "*Email address is empty.";
        feedback.style.color = "red";
        event.preventDefault();
        return;
	}	else if(!RegexEmail.test(email)) {
        feedback.innerHTML = "*Email address wrong format. example: username@uregina.ca";
        feedback.style.color = "red";
        event.preventDefault();
        return;
    }	else if (email.length > 40) {
    	feedback.innerHTML = "*Email address too long. Maximum is 40 characters.";
        feedback.style.color = "red";
        event.preventDefault();
        return;
  	}

    
    if (pword !== cpword) {
      feedback.innerText = "Passwords do not match.";
      feedback.style.color = "red";
      event.preventDefault();
      return;
    } else if (pword.length != 8){
        feedback.innerHTML = "*Password must be 8 Characters.";
		feedback.style.color = "red";
        event.preventDefault();
        return;
    }else if (pword == null || pword == ""){
		feedback.innerHTML = "*Password is empty.";
		feedback.style.color = "red";
        event.preventDefault();
        return;
	}else if(!RegexPword.test(pword)){
            feedback.innerHTML = "*Password is invalid. it must contain at least one non-letter character"
        	feedback.style.color = "red";
            event.preventDefault();
            return;
    }
    
    
    //  // If all validations pass, set feedback to green
    //  feedback.innerHTML = "Form submitted successfully.";
    //  feedback.style.color = "green"; // Set color to green
    
    // // If all validations pass, submit the form
    // this.submit();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/checkUsername", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Username doesn't exist, submit the form
                document.getElementById("SignUp").submit();
            } else if (xhr.status === 400) {
                // Username already exists, display feedback to the user
                feedback.innerHTML = "Username already exists.";
                feedback.style.color = "red";
            }
        }
    };
    xhr.send(JSON.stringify({ uname: uname }));

    
  });
  
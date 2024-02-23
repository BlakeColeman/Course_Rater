document.getElementById("SignUp").addEventListener("submit", function(event){
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
	 
	 var valid = true;

	 if (validateUsername(uname,feedback) == false)
	 {
		valid = false;
	 }
	 else if (validateEmail(email,RegexEmail,feedback) == false)
	 {
		valid = false;
	 }
	 else if (validatePassword(pword,cpword,RegexPword,feedback) == false)
	 {
		valid = false;
	 }

	 if (valid == true)
	 {
		//If all validations pass, set feedback to green
		feedback.innerHTML = "Form submitted successfully.";
		feedback.style.color = "green";
	
		// If all validations pass, submit the form
		document.getElementById("SignUp").submit();
	 }
	 else 
	 {
		event.preventDefault();
	 } 
});


function validateUsername(uname,feedback)
{
	if(uname == null || uname == "") 
	{
		feedback.innerHTML += "\n*Username is empty.";
		feedback.style.color = "red";
		return false;
	}
	
	checkUsername(uname, function (exists) 
	{
        if (exists) 
		{
            feedback.innerHTML += "\n*Username already in use";
            feedback.style.color = "red";
			return false;
        }
    });

	return true;
};

function validateEmail(email,RegexEmail,feedback)
{
	if(email == null || email == "") 
	{
		feedback.innerHTML += "\n*Email address is empty.";
		feedback.style.color = "red";
		return false;
	}	
	else if(!RegexEmail.test(email)) 
	{
		feedback.innerHTML += "\n*Email address is in the wrong format. Example: 'username@uregina.ca'";
		feedback.style.color = "red";
		return false;
	}	
	else if (email.length > 40) 
	{
		feedback.innerHTML += "\n*Email address too long. Maximum is 40 characters.";
		feedback.style.color = "red";
		return false;
	}

	checkEmail(email, function (exists) 
	{
        if (exists) 
		{
            feedback.innerHTML += "\n*Email address already in use";
            feedback.style.color = "red";
			return false;
        }
    });

	return true
};

function validatePassword(pword,cpword,RegexPword,feedback)
{
	if (pword == null || pword == "")
	{
		feedback.innerHTML += "\n*Password is empty.";
		feedback.style.color = "red";
		return false;
	}
	else if (pword.length != 8)
	{
		feedback.innerHTML += "\n*Password must be 8 Characters.";
		feedback.style.color = "red";
		return false;
	}
	else if(!RegexPword.test(pword))
	{
		feedback.innerHTML += "\n*Password is invalid. it must contain at least one special character"
		feedback.style.color = "red";
		return false;
	}
	else if (pword !== cpword) 
	{
	   feedback.innerText += "\n*Passwords do not match.";
	   feedback.style.color = "red";
	   return false;
	}
	return true;
};

function checkUsername(uname,callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/checkUsername", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) 
		{
			if (xhr.status === 200) 
			{
				callback(true);
			} 
			else if (xhr.status === 400) 
			{
				callback( false);
			}
		}
	};
	xhr.send(JSON.stringify({ uname: uname }));
};

function checkEmail(email,callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/checkEmail", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) 
		{
			if (xhr.status === 200) 
			{
				callback(true);
			} 
			else if (xhr.status === 400) 
			{
				callback(false);
			}
		}
	};
	xhr.send(JSON.stringify({ email: email }));
};

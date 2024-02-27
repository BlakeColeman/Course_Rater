document.getElementById("Login").addEventListener("submit", function(event){
   
    
    // Get form inputs
    var email = document.getElementById("email").value;
    var pword = document.getElementById("pword").value;

    // Perform validation
    var feedback = document.getElementById("feedback");
    feedback.innerText = ""; // Clear previous feedback
    feedback.style.color = ""; // Reset color

    var valid = true;

	 if (validateEmail(email,feedback) == false)
	{
	   valid = false;
	}
	else if (validatePassword(pword,feedback) == false)
	{
	   valid = false;
	}

	if (valid == true)
	{
	   //If all validations pass, set feedback to green
	   feedback.innerHTML = "Login successfully.";
	   feedback.style.color = "green";
   
	   // If all validations pass, submit the form
	   document.getElementById("Login").submit();
	}
	else 
	{
	   event.preventDefault();
	} 
});




function validateEmail(pword,feedback)
{
	var valid = true;
	if(email == null || email == "")  {
        feedback.innerHTML += "\n*Email address is empty.";
		feedback.style.color = "red";
		valid = false;
    }


	return valid;
};

function validatePassword(pword,feedback)
{
	var valid = true;
	if (pword == null || pword == "") {
        feedback.innerHTML += "\n*Password is empty.";
		feedback.style.color = "red";
		valid = false;
    }
	else if(!(checkPassword(pword)))
	{
        feedback.innerHTML += "\n*Password Doesn't match Email Address";
       	feedback.style.color = "red";
		valid = false;
    }


	return valid;
};





// function checkPassword(pword)
// {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open("POST", "/checkPassword", false);
// 	xhr.setRequestHeader("Content-Type", "application/json");

// 	var xPword = JSON.stringify({pword});
// 	var valid = true;

// 	xhr.onload = () =>
// 	{
// 		if (xhr.readyState == XMLHttpRequest.DONE) 
// 		{
// 			if (xhr.status == 200) 
// 			{
// 				valid = true;
// 			} 
// 			else if (xhr.status == 400) 
// 			{
// 				valid = false;
// 			}
// 		}
// 	};
// 	xhr.send(xPword);
// 	return valid;
// };

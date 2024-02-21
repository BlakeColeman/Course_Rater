//body.uname,body.email,body.pword

function SignupForm(event)
{

  //console.log(db);
  
  event.preventDefault();

	var emailInput = document.getElementById("email").value;
	var pswdInput1 = document.getElementById("setpassword").value;
	var pswdInput2 = document.getElementById("confirmpassword").value;
	
	var emailMsg = document.getElementById("msg_email");
	var pswdMsg = document.getElementById("msg_p1");
	//var pswdMsg2 = document.getElementById("pswd_S2");
	
	emailMsg.innerHTML = "";
	pswdMsg.innerHTML = "";
	
	var emailCheck = /^[\w]+@uregina.ca$/i;
	var pswdCheck = /^(\S*)?\d+(\S*)?$/;
	
	var checkResult = true;
	
	// email
	
	// Check if email address is empty
	if(emailInput == null || emailInput == "") 
	{
		emailMsg.innerHTML = "*Email address empty.";
		checkResult = false;
	}
		
	// Check if email is correct format
   	else if(!emailCheck.test(emailInput)) 
  	{
   	  	 emailMsg.innerHTML = "*Email address wrong format. example: username@uregina.ca";
		 checkResult = false;
  	}
		
	//// Check if email is correct size
  	else if (emailInput.length > 40) 
	{
    	  	msg_email.innerHTML = "*Email address too long. Maximum is 60 characters.";
		checkResult = false;
  	}

    
	// password

	if(pswdInput1 == null || pswdInput1 == "")
	{
		pswdMsg.innerHTML = "*Password is empty.";
		checkResult = false;
	}
   	else if(!pswdCheck.test(pswdInput1))
	{
        	pswdMsg.innerHTML = "*Password must contain letters and at least one digit."
        	checkResult = false;
    	}
    	else if(pswdInput1.length != 8)
	{
        	pswdMsg.innerHTML = "*Password must be 8 Characters."
        	checkResult = false;
    	}
    	else if(pswdInput1 != pswdInput2)
	{
        	pswdMsg.innerHTML = "*Passwords must match"
    	}
	
  var feedback = document.getElementById("feedback");
  feedback.innerHTML = "";      
	if(checkResult == false)
	{
		event.preventDefault();
    feedback.setAttribute("style", "color: red"); // Style Method 2: manipulate HTML attribute
    textNode = document.createTextNode("Invalid Data Entered");
    feedback.appendChild(textNode);
	}
  else 
  {
    //Set green text color
    feedback.style.color = "green";

    textNode = document.createTextNode("Account for " + uname +" has been created");
    feedback.appendChild(textNode);
   
    //send a form reset event to clear the form
    //document.getElementById("SignUp").reset();


  }
}

function ValidLogin(event)
{
	var emailInput = document.getElementById("email").value;
	var pswdInput = document.getElementById("password").value;
	
	var emailMsg = document.getElementById("email_S");
	var pswdMsg = document.getElementById("pswd_S");

	emailMsg.innerHTML = "";
	pswdMsg.innerHTML = "";
	
	var emailCheck = /^[\w]+@uregina.ca$/i;
	var pswdCheck = /^(\S*)?\d+(\S*)?$/;
	
	var checkResult = true;
	
	// email
	if(emailInput == null || emailInput == "")
	{
		emailMsg.innerHTML = "*Email address empty.";
		checkResult = false;
	}
    	else if(!emailCheck.test(emailInput))
   	 {
        	emailMsg.innerHTML = "*Email address wrong format. example: username@uregina.ca";
		checkResult = false;
   	 }
   	 else if (emailInput.length > 40)
	 {
       		emailMsg.innerHTML = "*Email address too long. Maximum is 60 characters.";
		checkResult = false;
   	 }
    
	// password
	if(pswdInput == null || pswdInput == "")
	{
		pswdMsg.innerHTML = "*Password is empty.";
		checkResult = false;
	}
   	else if(!pswdCheck.test(pswdInput))
	{
        	pswdMsg.innerHTML = "*Password must contain letters and at least one digit."
        	checkResult = false;
    	}
   	else if(pswdInput.length != 8)
	{
        	pswdMsg.innerHTML = "*Password must be 8 Characters."
        	checkResult = false;
    	}

	if(checkResult == false)
	{
		event.preventDefault();
	}
}

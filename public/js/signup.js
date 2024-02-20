function SignupForm(event)
{

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
	
	if(checkResult == false)
	{
		event.preventDefault();
	}
}


function SignUpForm(event) 
{

    event.preventDefault();
  
    var valid = true;

    var elements = event.currentTarget;
    
    var uname = elements[0].value;    
    var email = elements[1].value;
    var dob = elements[2].value;
    var p1 = elements[3].value;
    var p2 = elements[4].value;

    var regex_email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var regex_uname = /^[a-zA-Z0-9_-]+$/;
    var regex_pswd  = /^(\S*)?\d+(\S*)?$/;
    var regex_dob   = /^\d\d\d\d\-\d\d\-\d\d/;

    var msg_email = document.getElementById("msg_email");
    var msg_uname = document.getElementById("msg_uname");
    var msg_p1 = document.getElementById("msg_p1");
    var msg_p2 = document.getElementById("msg_p2");
    var msg_dob = document.getElementById("msg_dob");

    msg_email.innerHTML  = "";
    msg_uname.innerHTML = "";
    msg_p1.innerHTML = "";
    msg_p2.innerHTML = "";
    msg_dob.innerHTML = "";

    var textNode;
  
  
    // if email is left empty or email format is wrong, add an error message to the matching cell.
    if (email == null || email == "") {
      textNode = document.createTextNode("Email address empty.");
      msg_email.appendChild(textNode);
      valid = false;
    } 
    else if (regex_email.test(email) == false) {
      textNode = document.createTextNode("Email address wrong format. example: username@somewhere.sth");
      msg_email.appendChild(textNode);
      valid = false;
    }
    else if (email.length > 60) {
      textNode = document.createTextNode("Email address too long. Maximum is 60 characters.");
      msg_email.appendChild(textNode);
      valid = false;
    }

    //if username is empty or format is wrong add an error message
    if (uname == null || uname == "") {
      textNode = document.createTextNode("Username is empty.");
      msg_uname.appendChild(textNode);
      valid = false;
    }
    else if (regex_uname.test(uname) == false)
    {
        testNode = document.createTextNode("Invalid Username.");
        msg_uname.appendChild(textNode);
        valid = false;
    }

    //if password is empty or format is wrong add an error message
    if (p1==null || p1=="")
    {
        textNode = document.createTextNode("Password is Empty.");
        msg_p1.appendChild(textNode);
        valid= false;
    }
    else if (regex_pswd.test(p1) == false)
    {
        textNode = document.createTextNode("Invalid Password.");
        msg_p1.appendChild(textNode);
        valid= false;
    }
    else if (p1.length<8)
    {
        textNode = document.createTextNode("Password must be exactly 8 characters long.");
        msg_p1.appendChild(textNode);
        valid= false;
    }
  
  
    //if confirm password is empty or doesnt match password add an error message
    if (p2==null || p2=="")
    {
        textNode = document.createTextNode("Confirm Password is empty.");
        msg_p2.appendChild(textNode);
        valid=false;
    }
    else if (p1 !== p2)
    {
        textNode = document.createTextNode("Passwords do not match.");
        msg_p2.appendChild(textNode);
        valid=false;
    }
  
    //if Date of birth is empty or format is wrong add an error message
    if (dob==null||dob=="")
    {
      textNode = document.createTextNode("Date of Birth is empty.");
      msg_dob.appendChild(textNode);
      valid=false;
    }
    else if (regex_dob.test(dob)==false)
    {
      textNode = document.createTextNode("Please use YYYY-MM-DD format.");
      msg_dob.appendChild(textNode);
      valid=false;
    }


    var feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
    if (valid == true) {
      //Set green text color
      feedback.style.color = "green";

      textNode = document.createTextNode("Account for " + uname +" has been created");
      feedback.appendChild(textNode);
     
      //send a form reset event to clear the form
      document.getElementById("SignUp").reset();

  
    }
    else {
      event.preventDefault(); // Normally, this is where this command should be
  
      // If the form is not valid, display an "Invalid Data Entered" message and set red text color
  
      feedback.setAttribute("style", "color: red"); // Style Method 2: manipulate HTML attribute
      textNode = document.createTextNode("Invalid Data Entered");
      feedback.appendChild(textNode);
    }
  
  }

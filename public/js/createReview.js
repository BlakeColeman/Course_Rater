// createReview.js

const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('cname');

document.getElementById('cnameInput').value = courseName; 

// Adding the time when creating a review
const currentDate = new Date().toISOString().split('T')[0];
document.getElementById('rcreatedInput').value = currentDate;

// Ensure the user is logged in
fetch('/user')
    .then(response => {
        if (!response.ok) 
        {
            window.location.href = '/index'; 
        }
        return response.json();
    })
    .catch(error => console.error('Error fetching user:', error));

// display character count for prof input
function countChars(obj){
    document.getElementById('charNumProf').innerHTML = obj.value.length+ '/30';
}

// display character count for content input
function countCharsContent(obj){
    document.getElementById('charNumContent').innerHTML = obj.value.length+ '/500';
}

// display character count for grading input
function countCharsGrading(obj){
    document.getElementById('charNumGrading').innerHTML = obj.value.length+ '/500';
}

// display character count for additional notes input
function countCharsAnotes(obj){
    document.getElementById('charNumAnotes').innerHTML = obj.value.length+ '/500';
}

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
        if (!response.ok) {
            window.location.href = '/index'; 
        }
        return response.json();
    })
    .catch(error => console.error('Error fetching user:', error));
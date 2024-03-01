// reviewPage.js

// Displays the create review button if signed in, otherwise it is not displayed
fetch('/user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Not logged in');
        }
        return response.json();
    })
    .then(user => {
        const createButton = document.getElementById('createButton');
    })
    .catch(error => {
        createButton.style.display = 'none';
    });

    
const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('cname');

// Display the correct course name on the review page
const courseNameHeader = document.getElementById('courseNameHeader');
if (courseName) {
    courseNameHeader.innerText = `${courseName} reviews:`;
}
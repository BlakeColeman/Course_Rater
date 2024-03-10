// reviewPage.js

// Displays the create review button if signed in, otherwise it is not displayed
fetch('/user')
    .then(response => {
        if (!response.ok) {
            document.getElementById('createButton').style.display = 'none';
        }
        return response.json();
    })
    // Takes user to the create review page and passes course name in url
    .then(user => {
        
        const createReview = document.getElementById('createReview');
        const urlParams = new URLSearchParams(window.location.search);
        const cName = urlParams.get('cname');
        
        createReview.href = `/createReview?cname=${encodeURIComponent(cName)}`;
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });

const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('cname');

// Display the correct course name on the review page
const courseNameHeader = document.getElementById('courseNameHeader');
if (courseName) {
    courseNameHeader.innerText = `${courseName} reviews:`;
}

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
        
        createReview.href = `/createReview?cname=${cName}`;
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });

// Display the correct course name on the review page
const courseNameHeader = document.getElementById('courseNameHeader');
const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('cname');

fetch(`/reviews/${courseName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .then(reviews => {
        const reviewList = document.getElementById('review-list'); 

        reviewList.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `
            <article>
                <h3><b>Review by user: </b>${review.uname}</h3>
                <h3 style="text-align: left"><b>Description:</b> ${review.content}</h3>
                <h3 style="text-align: left"><b>Grading:</b> ${review.grading}</h3> 
                <h3 style="text-align: left"><b>Additional Notes:</b> ${review.anotes}</h3> 
                <h3 style="text-align: left"><b>Rating:</b> ${review.crating}</h3>
                <button type="button" id="reportButton">Report review</button> 
                <br><br>
            </article>
            <br>
            `;
            reviewList.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching user reviews:', error));

if (courseName) {
    courseNameHeader.innerText = `${courseName.toUpperCase()} reviews:`;
}

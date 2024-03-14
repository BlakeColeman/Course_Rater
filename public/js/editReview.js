// editReview.js

const urlParams = new URLSearchParams(window.location.search);
const reviewId = urlParams.get('id');

// Check if the user is the user of the review
fetch('/user')
    .then(response => {
        if (!response.ok) 
        {
            // If the user is not logged in, take them to the login page
            window.location.href = '/login'; 
        }
        return response.json();
    })
    .then(currentUser => {
        // Displaying the selected review
        fetch(`/reviewDetails/${reviewId}`)
            .then(response => {
                if (!response.ok) 
                {
                    throw new Error('Failed to fetch user reviews');
                }
                return response.json();
            })
            .then(reviews => {
                const reviewDetails = document.getElementById('reviewDetails');
                reviewDetails.innerHTML = '';

                // Check if the current user is the owner of the review
                if (currentUser.uname === reviews[0].uname) 
                {
                    reviews.forEach(review => {
                        const reviewElement = document.createElement('div');
                        reviewElement.innerHTML = `
                            <article>
                            <h3 style="text-align: right"><b>${review.rcreated}</b></h3>
                            <h6>${review.cname}</h6>
                            <h3 style="text-align: left"><b>Professor of the Course:</b> ${review.prof}</h3>
                            <h3 style="text-align: left"><b>General Description:</b> ${review.content}</h3>
                            <h3 style="text-align: left"><b>Assessment:</b> ${review.grading}</h3> 
                            <h3 style="text-align: left"><b>Additional Notes:</b> ${review.anotes}</h3> 
                            <h3 style="text-align: left"><b>Rating:</b> ${review.crating}/5</h3>
                            </article>
                        `;
                        reviewDetails.appendChild(reviewElement);
                    });

                    const deleteReviewButton = document.getElementById('deleteReviewButton');
                    deleteReviewButton.addEventListener('click', () => {
                        deleteReview(reviewId); 
                    });
                } 
                else 
                {
                    // If the current user is not the owner of the review, redirect to index page
                    window.location.href = '/index'; 
                }
            })
            .catch(error => console.error('Error fetching review details:', error));
    })
    .catch(error => console.error('Error fetching user:', error));

// For deleting a review
function deleteReview(reviewId) {
    fetch(`/deleteReview/${reviewId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to delete review');
        }
        window.location.href = '/account'; 
    })
    .catch(error => console.error('Error deleting review:', error));
}

fetch(`/reviewDetails/${reviewId}`)
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .catch(error => console.error('Error fetching user reviews:', error));


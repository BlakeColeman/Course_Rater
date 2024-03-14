// editReview.js

const urlParams = new URLSearchParams(window.location.search);
const reviewId = urlParams.get('id');

// displaying the selected review
fetch(`/reviewDetails/${reviewId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .then(reviews => {
        const reviewDetails = document.getElementById('reviewDetails');

        reviewDetails.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `
                <article>
                <h6>${review.cname}</h6>
                <h3 style="text-align: left"><b>Professor of the course:</b> ${review.prof}</h3>
                <h3 style="text-align: left"><b>General Description:</b> ${review.content}</h3>
                <h3 style="text-align: left"><b>Grading:</b> ${review.grading}</h3> 
                <h3 style="text-align: left"><b>Additional Notes:</b> ${review.anotes}</h3> 
                <h3 style="text-align: left"><b>Rating:</b> ${review.crating}/5</h3>
                </a>
                </article>
            `;
            reviewDetails.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching user reviews:', error));

// For deleting a review
function deleteReview(reviewId) {
    fetch(`/deleteReview/${reviewId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete review');
        }
        window.location.href = '/account'; 
    })
    .catch(error => console.error('Error deleting review:', error));
}

fetch(`/reviewDetails/${reviewId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .catch(error => console.error('Error fetching user reviews:', error));

const deleteReviewButton = document.getElementById('deleteReviewButton');
deleteReviewButton.addEventListener('click', () => {
    deleteReview(reviewId); 
});

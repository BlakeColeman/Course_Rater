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
                <h5><b>Description:</b> ${review.content}</h5>
                <h5><b>Grading:</b> ${review.grading}</h5> 
                <h5><b>Additional Notes:</b> ${review.anotes}</h5> 
                <h5><b>Rating:</b> ${review.crating}</h5>
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

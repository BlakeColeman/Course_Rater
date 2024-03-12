// editReview.js

const urlParams = new URLSearchParams(window.location.search);
const reviewId = urlParams.get('id');

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
                <p><b>Course Name:</b> ${review.cname}</p>
                <p><b>Description:</b> ${review.content}</p>
                <p><b>Grading:</b> ${review.grading}</p> 
                <p><b>Additional Notes:</b> ${review.anotes}</p> 
                <p><b>Rating:</b> ${review.crating}</p>
                </a>
                </article>
                <br>
            `;
            reviewDetails.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching user reviews:', error));

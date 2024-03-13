// studentAccount.js

// Find and display all reviews for a users account page
fetch('/userReviews')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .then(reviews => {
        const userReviews = document.getElementById('userReviews');

        userReviews.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `
                <article>
                <a href="/editReview?id=${review.review_id}" class="review-link">
                <p><b>Course Name:</b> ${review.cname}</p>
                <p><b>Description:</b> ${review.content}</p>
                <p><b>Grading:</b> ${review.grading}</p> 
                <p><b>Additional Notes:</b> ${review.anotes}</p> 
                <p><b>Rating:</b> ${review.crating}</p>
                </a>
                </article>
                <br>
            `;
            userReviews.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching user reviews:', error));

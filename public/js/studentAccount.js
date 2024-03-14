// studentAccount.js

// Find and display all reviews for a users account page
fetch('/userReviews')
    .then(response => {
        if (!response.ok) 
        {
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
                    <p style="text-align: right"><b>${review.rcreated}</b></p>
                    <p><b>Course Name:</b> ${review.cname}</p>
                    <p><b>Professor of the Course:</b> ${review.prof}</p>
                    <p>...</p>
                    <p><b>Rating:</b> ${review.crating}/5</p>
                </a>
                </article>
                <br>
            `;
            userReviews.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching user reviews:', error));

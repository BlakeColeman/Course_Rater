// editReview.js

const urlParams = new URLSearchParams(window.location.search);
const rid = urlParams.get('id');

// Check if the user is the user of the review
fetch('/user')
    .then(response => {
        if (!response.ok) {
            // If the user is not logged in, take them to the login page
            window.location.href = '/login'; 
        }
        return response.json();
    })
    .then(currentUser => {
        // displaying the selected review to edit similar to the create page
        fetch(`/reviewDetails/${rid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user reviews');
                }
                return response.json();
            })
            .then(reviews => {
                const reviewDetails = document.getElementById('reviewDetails');
                reviewDetails.innerHTML = '';
                if (currentUser.uname === reviews[0].uname) {
                    reviews.forEach(review => {
                        const reviewElement = document.createElement('div');
                        reviewElement.innerHTML = `
                        <h6><b>${review.cname} Review</b></h6>
                        <form action="/editReview" method="post">
                            <button type="button" onclick="deleteReview(${rid})" id="deleteReviewButton">Delete</button>    
                            <br>
                            <input type="hidden" id="cnameInput" name="cname" value="${review.cname}">
                            <input type="hidden" id="ridInput" name="rid" value="${rid}">
                            <h5>Enter the professor or instructor of the course:</h5>
                            <center><textarea name="prof" rows="1">${review.prof}</textarea></center>
                            <h5>Enter the content covered in the course:</h5>
                            <center><textarea name="content" id ="content" rows="8" >${review.content}</textarea></center>
                            <br>
                            <h5>Enter the grading and assignment structure of the course:</h5>
                            <center><textarea name="grading" id = "grading" rows="8">${review.grading}</textarea></center>
                            <br>
                            <h5>Any additional notes:</h5>
                            <center><textarea name="anotes" id = "anotes" rows="8">${review.anotes}</textarea></center>
                        
                            <h5>Rating:</h5>
                            <div class="rate" name="crating" id = "crating" value=${review.crating}>
                                <input type="radio" id="star5" name="rate" value="5" />
                                <label for="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" name="rate" value="4" />
                                <label for="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" name="rate" value="3" />
                                <label for="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" name="rate" value="2" />
                                <label for="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" name="rate" value="1" />
                                <label for="star1" title="text">1 star</label>
                            </div>
                            <button type="submit" class="submitButton">Confirm Edit</a>            
                        </form>
                        `;
                        reviewDetails.appendChild(reviewElement);

                        if (review.crating == 5)
                        {
                            console.log('5');
                            document.getElementById('star5').checked=true;
                        }
                        else if(review.crating == 4)
                        {
                            console.log('4');
                            document.getElementById('star4').checked=true;
                        }
                        else if(review.crating == 3)
                        {
                            console.log('3');
                            document.getElementById('star3').checked=true;
                        } 
                        else if (review.crating == 2)
                        {
                            console.log('2');
                            document.getElementById('star2').checked=true;
                        }
                        else
                        {
                            console.log('1');
                            document.getElementById('star1').checked=true;
                        }
                    });
                } else {
                    // If the current user is not the owner of the review, redirect to index page
                    window.location.href = '/index'; 
                }

    })
    .catch(error => console.error('Error fetching user reviews:', error));
})
.catch(error => console.error('Error fetching user:', error));

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
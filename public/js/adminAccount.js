// adminAccount.js

// For viewing the suspended accounts
fetch('/admin/suspendedUsers')
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to fetch suspended users');
        }
        return response.json();
    })
    .then(suspendedUsers => {
        const suspendedUsersList = document.getElementById('suspendedUsersList');

        suspendedUsersList.innerHTML = '';

        suspendedUsers.forEach(user => {
            const suspendedElement = document.createElement('div');

            // Generate and set an ID for each suspended account element
            const suspendedElementId = `${user.uname}`; 
            suspendedElement.id = suspendedElementId;

            suspendedElement.innerHTML = `
                <div class='suspendedAccounts'>
                <button type="button" class="unsusButton" onclick="unsuspendUser('${user.uname}', '${suspendedElementId}')">Unsuspend</button>
                    <h3 style="text-align: left"><b>Username: ${user.uname}</h3>
                    <h3 style="text-align: left"><b>Email: ${user.email}</h3>
                </div>
                <br>
            `;
            suspendedUsersList.appendChild(suspendedElement);
        });
    })
    .catch(error => console.error('Error fetching suspended users:', error));

// Unsuspend user feature
function unsuspendUser(username, suspendedElementId) {
    fetch(`/admin/unsuspendUser/${username}`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to unsuspend user');
        }

        // Hide the suspended account after unsuspending
        const suspendedElement = document.getElementById(suspendedElementId);
        if (suspendedElement) {
            suspendedElement.style.display = 'none';
        }
    })
    .catch(error => console.error('Error unsuspending user:', error));
}

//suspend user
function suspendUser(username, buttonElement) {
    fetch(`/admin/suspendUser/${username}`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to suspend user');
        }
        
        // Hide the suspend button after it's clicked
        buttonElement.style.display = 'none';
    })
    .catch(error => console.error('Error suspending user:', error));
}

// deleting a reported review
function deleteReview(reviewId) {
    fetch(`/admin/deleteReview/${reviewId}`, {
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

// dismiss a reported review
function dismissReport(reviewId) {
    fetch(`/admin/dismissReport/${reviewId}`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Failed to dismiss review');
        }
        window.location.href = '/account'; 
    })
    .catch(error => {
        console.error('Error reporting review:', error);
    });
}

// Get all of the reported reviews
fetch('/admin/reported-reviews')
    .then(response => response.json())
    .then(reviews => {
        const displayReviews = document.getElementById('displayReports');

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');

            // Button to see the full reported review 
            const toggleButton = document.createElement('button');
            toggleButton.textContent = `Course ID: ${review.cid}, Review ID: ${review.review_id}`;
            toggleButton.classList.add('button1')

            const reviewContent = document.createElement('div');
            reviewContent.classList.add('review-content');
            reviewContent.innerHTML = `
                <article>
                    <button type="button" onclick="dismissReport('${review.review_id}')" class="dismissButton">Dismiss</button>
                    <br>
                    <p><b>User Name:</b> ${review.uname}</p>
                    <p><b>Content:</b> ${review.content}</p>
                    <p><b>General Description:</b> ${review.content}</p>
                    <p><b>Assessment:</b> ${review.grading}</p> 
                    <p><b>Additional Notes:</b> ${review.anotes}</p> 
                    
                    <button type="button" onclick="deleteReview('${review.review_id}')" class="adminButton">Delete</button>
                    <button type="button" class="adminButton" onclick="suspendUser('${review.uname}', this)">Suspend Account</button>
                    <br><br>
                </article>
            `;
            reviewContent.style.display = 'none'; 

            toggleButton.addEventListener('click', () => {
                if (reviewContent.style.display === 'none') 
                {
                    reviewContent.style.display = 'block';
                    toggleButton.textContent = 'Hide Review';
                } 
                else 
                {
                    reviewContent.style.display = 'none';
                    toggleButton.textContent = `Course ID: ${review.cid}, Review ID: ${review.review_id}`;
                }
            });

            reviewElement.appendChild(toggleButton);
            reviewElement.appendChild(reviewContent);
            displayReviews.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching reported reviews:', error));

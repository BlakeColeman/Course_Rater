// adminAccount.js

// For viewing the suspended accounts
fetch('/admin/suspendedUsers')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch suspended users');
        }
        return response.json();
    })
    .then(suspendedUsers => {
        const suspendedUsersList = document.getElementById('suspendedUsersList');

        suspendedUsersList.innerHTML = '';

        suspendedUsers.forEach(user => {
            const suspendedElement = document.createElement('div');
            suspendedElement.innerHTML = `
                <div class='suspendedAccounts'>
                    <button type="button" id="unsusButton" onclick="unsuspendUser('${user.uname}')">Unsuspend</button>
                    <h3 style="text-align: left"><b>Username: ${user.uname}</h3>
                    <h3 style="text-align: left"><b>Email: ${user.email}</h3>
                </div>
            `;
            suspendedUsersList.appendChild(suspendedElement);
        });
    })
    .catch(error => console.error('Error fetching suspended users:', error));

// Unsuspend user feature
function unsuspendUser(username) {
    fetch(`/admin/unsuspendUser/${username}`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to unsuspend user');
        }
        // Reload the page
        location.reload();
    })
    .catch(error => console.error('Error unsuspending user:', error));
}

// Get all of the reported reviews
fetch('/reported-reviews')
        .then(response => response.json())
        .then(reviews => {
            const displayReviews = document.getElementById('displayReports');

            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                <article>
                    <p><b>User Name:</b> ${review.uname}</p>
                    <p><b>Content:</b> ${review.content}</p>
                    <p><b>General Description:</b> ${review.content}</p>
                    <p><b>Assessment:</b> ${review.grading}</p> 
                    <p><b>Additional Notes:</b> ${review.anotes}</p> 
                </article>
                `;
                displayReviews.appendChild(reviewElement);
            });
        })
        .catch(error => console.error('Error fetching reported reviews:', error));
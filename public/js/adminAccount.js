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
                    <button type="button" id="unsusButton">unsuspend</button> 
                    <h3 style="text-align: left"><b>Username: ${user.uname}</h3>
                    <h3 style="text-align: left"><b>Email: ${user.email}</h3>
                </div>
            `;
            suspendedUsersList.appendChild(suspendedElement);
        });
    })
    .catch(error => console.error('Error fetching suspended users:', error));
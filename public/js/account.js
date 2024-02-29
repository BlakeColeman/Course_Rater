fetch('/user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Not logged in');
        }
        return response.json();
    })
    .then(user => {
        // User is logged in, render logged in header
        renderLoggedInHeader(user.uname);
    })
    .catch(error => {
        console.error('Error fetching account information', error);
    });

function renderLoggedInHeader(uname) {
    const header = document.getElementById('headerA');
    header.innerHTML = `
        <a href="/logout" class="homeButton">Logout</a>
    
        <a href="/index" class="title-link">
            <h4 class="title">U of R Course Rating</h4>
        </a>

        <span>${uname}</span>
    `;
}
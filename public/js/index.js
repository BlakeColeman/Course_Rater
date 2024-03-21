// index.js

fetch('/user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Not logged in');
        }
        return response.json();
    })
    .then(user => {
        // User is logged in, render logged in header
        renderLoggedInHeader(user.uname, user.role);
    })
    .catch(error => {
        // User is not logged in, render logged out header
        renderLoggedOutHeader();
    });

// header for if the user is logged in
function renderLoggedInHeader(uname, role) {
    const header = document.getElementById('header');
    
    let welcomeMessage = `Welcome, ${uname}`;
    // if the user logged in is the addmin, display they are admin on welcome
    if (role && role.toLowerCase() === 'admin') {
        welcomeMessage += ' (*Admin)';
    }

    header.innerHTML = `
        <a href="/logout" class="homeButton">Logout</a>
        <a onclick="window.location.href='/account'" class="homeButton">Account</a>
        
        <a href="/index" class="title-link">
            <h4 class="title">U of R Course Rating</h4>
        </a>

        <span>${welcomeMessage}</span>
    `;
}

// header for if the user is not logged in
function renderLoggedOutHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
        <a href="/signup" class="homeButton">Sign up</a>
        <a href="/login" class="homeButton">Log in</a>

        <a href="/index" class="title-link">
            <h4 class="title">U of R Course Rating</h4>
        </a>
    `;
}

// Function to load courses given search
const load_courses = function(query = '') {
    fetch('/getCourse?cname=' + query)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseData) {
            var html = '';
            if (responseData.message) {
                // Course not found, disable submit button
                document.getElementById("mySubmit").disabled = true;
            } else {
                // Course found, enable submit button
                document.getElementById("mySubmit").disabled = false;
                html += '<ul>';
                responseData.forEach(function(course) {
                    html += '<li>' + course.cname + '</li>';
                });
                html += '</ul>';
            }
            document.getElementById('search_result').innerHTML = html;
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            // Disable submit button if course entered does not exist
            document.getElementById("mySubmit").disabled = true;
            document.getElementById('search_result').innerHTML = '<p>Course not found</p>';
        });
};

var search_input = document.getElementById("search_input");
search_input.addEventListener('input', function() {
    var query = search_input.value;
    load_courses(query);
});
// index.js

// Function to load data and handle response
const load_data = function(query = '') {
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

// Add event listener to search input
var search_input = document.getElementById("search_input");
search_input.addEventListener('input', function() {
    var query = search_input.value;
    load_data(query);
});
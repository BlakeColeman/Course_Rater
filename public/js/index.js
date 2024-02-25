// index.js

// for the search function
const load_data = function(query = '') {
  fetch('/getCourse?cname=' + query)
      .then(function(response) {
          return response.json();
      })
      .then(function(responseData) {
          var html = '';
          if (responseData.length > 0) {
              html += '<ul>';
              responseData.forEach(function(course) {
                  html += '<li>' + course.cname + '</li>';
              });
              html += '</ul>';
          } else {
              html += '<p>No courses found</p>';
          }
          document.getElementById('search_result').innerHTML = html;
      })
      .catch(function(error) {
          console.error('Error fetching data:', error);
          document.getElementById('search_result').innerHTML = '<p>No Course Found</p>';
      });
};

var search_input = document.getElementById("search_input");
search_input.addEventListener('input', function() {
  var query = search_input.value;
  load_data(query);
});
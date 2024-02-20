// header.js
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                headerContainer.innerHTML = xhr.responseText;
            } else {
                console.error('Error loading header:', xhr.status);
            }
        }
    };
    xhr.onerror = function() {
        console.error('Network error occurred while trying to fetch the header.');
    };
    xhr.open('GET', '/html/header.html');
    xhr.send();
});

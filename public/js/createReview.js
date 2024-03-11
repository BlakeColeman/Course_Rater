// createReview.js

const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('cname');

document.getElementById('cnameInput').value = courseName; 
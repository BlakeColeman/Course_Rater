// review.js

fetch('/user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user reviews');
        }
        return response.json();
    })
    .then(user => {
        
        const review = document.getElementById('review');
        const urlParams = new URLSearchParams(window.location.search);
        const cName = urlParams.get('review_id');
        
        review.href = `/review?review=${review_id}`;
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });


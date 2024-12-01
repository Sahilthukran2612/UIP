document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem('email');
  if (!email) {
    alert('Please log in first');
    window.location.href = 'login.html';
    return;
  }

  fetch('movies.json')
    .then(response => response.json())
    .then(data => {
      const moviesContainer = document.getElementById('movies');
      data.forEach(movie => {
        const card = document.createElement('a');
        card.href = movie.url; // Link to the movie's URL
        card.target = '_blank'; // Open in a new tab
        card.classList.add('card');
        card.innerHTML = `
          <img src="${movie.image}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
        `;

        card.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent event bubbling
          fetch('http://localhost:5000/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, movie })
          }).catch(err => console.error(err));
        });

        moviesContainer.appendChild(card);
      });
    }).catch(err => console.error(err));
});

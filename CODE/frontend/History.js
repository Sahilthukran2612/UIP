document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Please log in first');
      window.location.href = 'login.html';
      return;
    }
  
    const historyContainer = document.getElementById('history');
  
    fetch(`http://localhost:5000/history?email=${email}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(movie => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <button class="remove-btn" data-title="${movie.title}">Remove</button>
          `;
  
          card.querySelector('.remove-btn').addEventListener('click', () => {
            fetch('http://localhost:5000/history', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, movieTitle: movie.title })
            }).then(() => {
              alert('Movie removed');
              card.remove();
            }).catch(err => console.error(err));
          });
  
          historyContainer.appendChild(card);
        });
      }).catch(err => console.error(err));
  });
  
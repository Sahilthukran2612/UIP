
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.querySelector(".navigation").classList.toggle("active");
});


document.addEventListener("scroll", () => {
    const popularSection = document.querySelector(".popular-movies-section");
    const position = popularSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (position < screenPosition) {
        popularSection.classList.add("fade-in");
    }
});




//
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html'; }
//





document.querySelector(".subscribe-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = document.querySelector(".subscribe-form input[type='email']");
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        alert("Thank you for subscribing!");
        emailInput.value = "";
    } else {
        alert("Please enter a valid email address.");
    }
});


document.querySelector('.userdetail').addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');

    dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';

  
    event.stopPropagation();
});


window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');
 
    if (!event.target.matches('.userdetail') && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

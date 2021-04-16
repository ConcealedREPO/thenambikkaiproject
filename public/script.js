const toggleHamburger = document.querySelector(".toggle-hamburger")
const navbarLinks = document.querySelector(".navbar-links")
toggleHamburger.addEventListener("click",() =>{
  navbarLinks.classList.toggle('active')
})

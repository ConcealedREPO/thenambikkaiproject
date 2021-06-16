if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready(){
  const toggleHamburger = document.querySelector(".toggle-hamburger")
  const navbarLinks = document.querySelector(".navbar-links")
  toggleHamburger.addEventListener("click",() =>{
    navbarLinks.classList.toggle('active')
  })
}
const openNavLink = document.querySelector(".navigation-menu")

export function openNavigation(){
  if(openNavLink === null) return 
  
  document.addEventListener("click", e => {
    if(!e.target.matches(".hamburger-menu")) return

    openNavLink.classList.toggle("show")
  })
}
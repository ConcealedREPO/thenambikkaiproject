const currentEvent = [
  {
    "eventId" : 1,
    "event-image": "/images/Event_2.jpeg",
    "event-details": "Join Us On Our Sweet, Sweet Journey!The past 18 months have undeniably been a Rocky journey for us all, and whilst the end of this long Road is within sight, we still have a ways to go before we get there! So why not celebrate making it this far by joining an event that will motivate you to get healthy and running, whilst also contributing to a great cause? </br></br>Putting a healthy twist on turning to ice cream for comfort, we decided to theme our very first Virtual Run after a flavour invented in the Roaring 20’s to help cure the blues of the people.</br></br>All profits will be going towards our goals, and we will be 100% transparent with our amazing supporters - you - by publishing and showing proof of us contributing towards our goals. So what are you waiting for? Sign up now, and you know your time and money will be going towards a good cause - for yourself and the orphanage we are currently working on equipping!</br></br>Date to be announced soon!!!"
  },
]
const pastEvents = [
  {
    "eventId" : 2,
    "event-image": "/images/Event_3.jpeg",
    "event-details": "A lively and thought provoking debate between 5 students, this panel discussion was the debut event that kickstarted The Nambikkai Project - and helped us bring in our first RM500 in donations."
  },
  {
    "eventId" : 3,
    "event-image": "/images/Event_1.png",
    "event-details": "Join us for a morning of destressing, stretching, and learning about the origins of the ancient art. Led by Ms Shanthi, the founder of Sahasra Yoga. Link to register in our bio! The cost of the class is RM25, 100% of which will be donated to our cause. In accordance with the guidelines of the current Movement Control Order, the class will be held online."
  },
]

const currentEventGrid = document.querySelector(".current-event-grid")
const currentTileTemplate = document.querySelector(".current-event-tile-template")
const currentInformationTemplate = document.querySelector(".event-information-template")

const eventGrid = document.querySelector(".event-grid")
const tileTemplate = document.querySelector(".event-tile-template")
const informationTemplate = document.querySelector(".event-information-template")
const popup = document.querySelector(".popup-overlay")

// const closePopup = document.querySelector(".btn-close")
export function populateEventGrid(){
  if(tileTemplate === null || informationTemplate === null || eventGrid === null || popup === null) return
  currentCreateTile()
  currentOpenPopup()
  createTile()
  openPopup()
  closePopup()
}

function createTile(){
  pastEvents.forEach(event => {
    const copyTemplate = tileTemplate.content.cloneNode(true)

    const eventTile = copyTemplate.querySelector(".event-tile")
    eventTile.dataset.eventId = event.eventId
  
    const img = copyTemplate.querySelector("[data-event-img]")
    img.src = event["event-image"]
    eventGrid.appendChild(copyTemplate)
  })
}

function openPopup(){
  document.addEventListener("click",(e) => {
    if(!e.target.matches(".know-more")) return
    const parentElement = e.target.closest(".event-tile") 
    const parentId = Number(parentElement.dataset.eventId)
    showDetails(parentId)
  })
}

function showDetails(id){
  const getEvent = pastEvents.find(event => event.eventId === id)
  const copyTemplate = informationTemplate.content.cloneNode(true)

  const image = copyTemplate.querySelector("[data-popupEvent-img]")
  image.src = getEvent["event-image"]

  const description = copyTemplate.querySelector("[data-event-description]")
  description.innerHTML = getEvent["event-details"]

  popup.appendChild(copyTemplate)
  popup.classList.add("show-details")
}

function closePopup(){
  document.addEventListener("click",(e) => {
    if(!e.target.matches(".btn-close")) return
    popup.classList.remove("show-details")
    popup.innerHTML = ""
  })
}

function currentCreateTile(){
  currentEvent.forEach(event => {
    const copyTemplate = currentTileTemplate.content.cloneNode(true)
    const eventTile = copyTemplate.querySelector(".current-event-tile")
    eventTile.dataset.eventId = event.eventId
  
    const img = copyTemplate.querySelector("[data-event-img]")
    img.src = event["event-image"]
    currentEventGrid.appendChild(copyTemplate)
  })
}

function currentOpenPopup(){
  document.addEventListener("click",(e) => {
    if(!e.target.matches(".current-know-more")) return
    const parentElement = e.target.closest(".current-event-tile") 
    const parentId = Number(parentElement.dataset.eventId)
    currentShowDetails(parentId)
  })
}

function currentShowDetails(id){
  const getEvent = currentEvent.find(event => event.eventId === id)
  const copyTemplate = currentInformationTemplate.content.cloneNode(true)

  const image = copyTemplate.querySelector("[data-popupEvent-img]")
  image.src = getEvent["event-image"]

  const description = copyTemplate.querySelector("[data-event-description]")
  description.innerHTML = getEvent["event-details"]

  popup.appendChild(copyTemplate)
  popup.classList.add("show-details")
}



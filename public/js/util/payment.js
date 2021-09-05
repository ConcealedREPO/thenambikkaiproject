const donationOverlay = document.querySelector(".donation-overlay")
const form = document.querySelector("#donation-form")


export function payment(){
  if(form === null || donationOverlay === null) return 
  processPayment()
  openPaymentWindow()
  closePaymentWindow()
}

function openPaymentWindow(){
  document.addEventListener("click",(e) => {
    if(!e.target.matches(".payment")) return
    donationOverlay.classList.add("show")
  })
}

function closePaymentWindow(){
  document.addEventListener("click",(e) => {
    if(!e.target.matches(".close-button")) return
    donationOverlay.classList.remove("show")
  })
}


function processPayment(){
  form.addEventListener("submit", async(e) => {
    e.preventDefault()
    const header = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
  
      body: JSON.stringify({
        donationAmount: amount.value
      })
    }
  
    //Create Checkout Session
    const {sessionId} = await fetch("/create-session", header).then(res => res.json())
  
    //Redirect Checkout   
    stripe.redirectToCheckout({
      sessionId : sessionId
    })
  })
}
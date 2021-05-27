if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const toggleHamburger = document.querySelector(".toggle-hamburger")
  const navbarLinks = document.querySelector(".navbar-links")
  toggleHamburger.addEventListener("click",() =>{
    navbarLinks.classList.toggle('active')
  })

  let removeCartItemButtons = document.querySelectorAll('.btn-danger')

  for(let button of removeCartItemButtons){
    button.addEventListener("click", removeCartItem)
  }

  let quantityInputs = document.querySelectorAll('.cart-quantity-input')
  for(let input of quantityInputs){
    input.addEventListener("click", quantityChanged)
  }

  let addToCartButtons = document.querySelectorAll('.shop-item-button')
  for(let button of addToCartButtons){
    button.addEventListener('click',addToCartClicked)
  }

  document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked)
}

let stripeHandler = StripeCheckout.configure({
  key: stripePublicKey,
  locale: 'en',
  currency: 'myr',
  image: "images/marketplace.png",
  description: "The Nambikkai Project",
  token: function(token) {
    let items = []
    let cartItemContainer = document.querySelector('.cart-items')
    let cartRows = cartItemContainer.querySelectorAll('.cart-row')

    for(let cartRow of cartRows){
        let quantityElement = cartRow.querySelector('.cart-quantity-input')
        let quantity = quantityElement.value
        let id = cartRow.dataset.itemId
        items.push({
            id: id,
            quantity: quantity
        })
    }
    fetch('/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            stripeTokenId: token.id,
            items: items
        })
    }).then((res) => res.json())
    .then((data) =>{
        alert(data.message)
        let cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }).catch((error) => console.error(error))
  }
})

function purchaseClicked() {
  let userName = document.querySelector("#userName")
  let priceElement = document.getElementsByClassName('cart-total-price')[0]
  let price = parseFloat(priceElement.innerText.replace('RM', '')) * 100
  
  // if(userName.value === ""){
  //   return alert("Complete the consent form before checkout")
  // }

  if(price < 1){
    return alert("No item selected")
  
  } else {
    stripeHandler.open({
      amount: price
    })
  } 
}

function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  let id = shopItem.dataset.itemId
  addItemToCart(title, price, imageSrc, id)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc, id) {
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  cartRow.dataset.itemId = id
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(let itemNames of cartItemNames){
    if(itemNames.innerText == title){
      alert('This item is already added to the cart')
      return      
    }
  }

  let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem)
  cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector('.cart-items')
  let cartRows = cartItemContainer.querySelectorAll('.cart-row')
  let total = 0

  for(let cartRow of cartRows){
      let priceElement = cartRow.querySelector('.cart-price')
      let quantityElement = cartRow.querySelector('.cart-quantity-input')
      let price = parseFloat(priceElement.innerText.replace('RM', ''))
      let quantity = quantityElement.value
      total = total + (price * quantity)    
  }
  total = Math.round(total * 100) / 100
  document.querySelector('.cart-total-price').innerText = 'RM' + total
}


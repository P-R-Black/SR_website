
console.log("Insanity Check!")
// new
// Get Stripe publishable key
fetch("./config/")
.then((result) => { return result.json(); })
.then((data) => {
  // Initialize Stripe.js
  const stripe = Stripe(data.publicKey);
  
  // new
  // Event handler
  document.querySelector("#submitBtn").addEventListener("click", () => {
    // Get Checkout Session ID
    fetch("./create-checkout-session/")
    .then((result) => { return result.json(); })
    .then((data) => {
      console.log(data);
      console.log("Insanity Check! 2")
      // Redirect to Stripe Checkout
      return stripe.redirectToCheckout({sessionId: data.sessionId})
    })
    .then((res) => {
      console.log(res);
    });
  });
});
console.log("Insanity Check! 3")
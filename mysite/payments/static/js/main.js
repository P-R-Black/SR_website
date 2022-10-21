console.log("Sanity Check 1")
function validateForm(data) {
  let errors = []

  if (data.first_name === '') {
      errors.push('First name is empty')
  }

  if (data.last_name === '') {
      errors.push('Last name is empty')
  }

  if (data.email === '') {
      errors.push('Email is empty')
  }

  return errors
}

function buy(event) {
  console.log("Sanity Check 2")
  event.preventDefault()

  let data = {
      'first_name': document.querySelector('input[name=first_name]').value,
      'last_name': document.querySelector('input[name=last_name]').value,
      'email': document.querySelector('input[name=email]').value,
  }

  let errors = validateForm(data)

  if (errors.length) {
      console.log('Errors', errors)
  } else {
      var stripe = Stripe('pk_test_AGjSQt22JrGKa4oNjln8Bqyw')

      fetch('start_order/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': '{{ csrf_token }}'
          },
          credentials: 'same-origin',
          body: JSON.stringify(data),
      })
      .then(function(response) {
          // console.log(response.json())
          return response.json()
      })
      .then(function(session) {
          return stripe.redirectToCheckout({ sessionId: session.session.id })
      })
      .then(function(result) {
          if (result.error) {
              alert(result.error.message)
          }
      })
      .catch(function(error) {
          console.log('Errors', error)
      })
  }
  
  return false
}

// console.log("Insanity Check!")
// // new
// // Get Stripe publishable key
// fetch("./config/")
// .then((result) => { return result.json(); })
// .then((data) => {
//   // Initialize Stripe.js
//   const stripe = Stripe(data.publicKey);
  
//   // new
//   // Event handler
//   document.querySelector("#submitBtn").addEventListener("click", () => {
//     // Get Checkout Session ID
//     fetch("./create-checkout-session/")
//     .then((result) => { return result.json(); })
//     .then((data) => {
//       console.log(data);
//       console.log("Insanity Check! 2")
//       // Redirect to Stripe Checkout
//       return stripe.redirectToCheckout({sessionId: data.sessionId})
//     })
//     .then((res) => {
//       console.log(res);
//     });
//   });
// });
// console.log("Insanity Check! 3")
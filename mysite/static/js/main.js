console.log('sanity check Main.js')
function validateForm(data) {
  let errors = []

  if (data.first_name === '') {
      errors.push('First Name is Empty')
  }

  if (data.last_name === '') {
      errors.push('Last Name is Empty')
  }

  if (data.email === '') {
      errors.push('Email Address is Empty')
  }

  let html = ''
  let errorsElement = document.getElementById('errors');

  for (let i = 0; i < errors.length; i++){
    html += errors[i] + '<br>';
  }

  
  if (errors.length){
    errorsElement.classList.remove('hidden')
    errorsElement.innerHTML = html
  } else {
    errorsElement.classList.add('hidden')
  }


  return errors
}

function buy(event) {

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
          // console.log('response.json()', response.json())
          return response.json()
      })
      .then(function(session) {
            // console.log('stripe.redirectToCheckout({ sessionId: session.session.id }', session.session.id)
          return stripe.redirectToCheckout({ sessionId: session.session.id })
      })
      .then(function(result) {
          if (result.error) {
              alert(result.error.message)
          }
      })
      .catch(function(error) {
          console.log('Errors 2', error)
      })
  }
  
  return false
}

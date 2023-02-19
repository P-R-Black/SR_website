

// Hamburger Menu
const hamburger = document.querySelector('#mobile_menu');
const navElements = document.querySelector('.navbar_menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is_active');
    navElements.classList.toggle('active');
})


const mobileMenu = document.querySelectorAll('.navbar_links').forEach(n => n.addEventListener('click', ()=> {
    hamburger.classList.toggle('active');
    navElements.classList.toggle('active');
    console.log('Testing 2')
}))



const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is_active')
    if(window.innerWidth <= 768 && menuBars) {
        hamburger.classList.toggle('is_active')
        navElements.classList.toggle('active')
        console.log('Testing 3')
    }
}

hamburger.addEventListener('click', mobileMenu)
navElements.addEventListener('click', hideMobileMenu)





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

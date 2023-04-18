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
}))



const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is_active')
    if(window.innerWidth <= 768 && menuBars) {
        hamburger.classList.toggle('is_active')
        navElements.classList.toggle('active')
    }
}

hamburger.addEventListener('click', mobileMenu)
navElements.addEventListener('click', hideMobileMenu)

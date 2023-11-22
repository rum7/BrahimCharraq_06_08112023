const modal = document.getElementById("contact_modal")
const contactForm = document.getElementById('contact')
contactForm.addEventListener('submit', submitContactForm)

function displayModal() {
	modal.style.display = "grid"
    document.body.style.overflow = "hidden"
}

function closeModal() {
    modal.style.display = "none"
    document.body.removeAttribute('style')
}

function submitContactForm(event) {
    event.preventDefault()
    console.log("Votre message est en cours de traitement 🥴")
    closeModal()
}
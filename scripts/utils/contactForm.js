/* eslint-disable no-unused-vars */
const modal = document.getElementById("contact_modal")
const contactForm = document.getElementById('contact')
contactForm.addEventListener('submit', submitContactForm)

const closeFormBtn = document.querySelector('.close-modal-contact')
closeFormBtn.addEventListener('click', closeModal)

const inputAutofocus = document.getElementById('prenom')

document.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal()
    }
})

function displayModal() {
	modal.style.display = "grid"
    modal.setAttribute('aria-hidden', false)
    document.body.style.overflow = "hidden"
    inputAutofocus.focus()
}

function closeModal() {
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', true)
    document.body.removeAttribute('style')
}

// check firstname and lastname value
function checkFormName(label, value) {
    const pattern = /^[a-zà-üA-ZÀ-Ü]{2,}/
    const regex = new RegExp(pattern)
    const testValue = regex.test(value)

    if (value.trim().length >= 2 && testValue) {
      handleErrorMessage(label)
      return true
    }
  
    const message = "Vous devez entrer au moins deux lettres."
    handleErrorMessage(label, message)
    return false
}

// check email value
function checkFormEmail(email) {
    const pattern = /^[\w._-]+@[\w._-]+\.[\w._-]+/
    const regex = new RegExp(pattern)
    const testEmail = regex.test(email)
    if(testEmail) {
      handleErrorMessage('email')
      return true
    }
  
    const message = 'L\'adresse email doit être valide.'
    handleErrorMessage('email', message)
    return false
}

// check message value
function checkFormMessage(msg) {
    if (msg.trim().length >= 10 && msg.trim().length <= 500) {
      handleErrorMessage('message')
      return true
    }
  
    const message = "Votre message doit contenir entre 20 et 500 caractères."
    handleErrorMessage('message', message)
    return false
}

// display or hide error message
function handleErrorMessage(label, message) {
    const nameNode = document.getElementById(`${label}`)
    const nameNodeParent = nameNode.parentNode
  
    if(message !== undefined) {
      nameNodeParent.dataset.error = message
      nameNodeParent.dataset.errorVisible="true"
    }else{
      nameNodeParent.removeAttribute('data-error')
      nameNodeParent.removeAttribute('data-error-visible')
    }
}

function submitContactForm(event) {
    event.preventDefault()

    const formData = new FormData(contactForm)
    const firstname = checkFormName("prenom", formData.get("prenom"))
    const lastname = checkFormName("nom", formData.get("nom"))
    const email = checkFormEmail(formData.get("email"))
    const message = checkFormMessage(formData.get("message"))

    const valideForm = firstname && lastname && email && message
    if (valideForm) {
      console.log('Merci pour votre inscription!')
      console.log(`Prénom: ${formData.get("prenom")}`)
      console.log(`Nom: ${formData.get("nom")}`)
      console.log(`Email: ${formData.get("email")}`)
      console.log(`Message: ${formData.get("message")}`)
      contactForm.reset()
      closeModal()
    } else {
      console.log("Le formulaire contient des erreurs!")
    }
}
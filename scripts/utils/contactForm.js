function displayModal() {
    const modal = document.getElementById("contact_modal")
	modal.style.display = "grid"
    document.body.style.overflow = "hidden"
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
    document.body.removeAttribute('style')
}

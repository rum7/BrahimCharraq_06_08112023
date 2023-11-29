/* eslint-disable no-unused-vars */
function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement('article')

        const profilePicture = document.createElement('img')
        profilePicture.setAttribute("src", picture)
        profilePicture.setAttribute("alt", name)
        
        const photographerName = document.createElement('h2')
        photographerName.textContent = name
        
        const photographerLink = document.createElement('a')
        photographerLink.setAttribute("href", `photographer.html?id=${id}`)
        photographerLink.setAttribute("aria-label", `Visiter la galerie de ${name}`)
        photographerLink.appendChild(profilePicture)
        photographerLink.appendChild(photographerName)

        const photographerLocation = document.createElement('p')
        photographerLocation.textContent = `${city}, ${country}`
        
        const photographerQuote = document.createElement('p')
        photographerQuote.textContent = tagline
        
        const photographerPrice = document.createElement('p')
        photographerPrice.textContent = `${price}€/jour`

        article.appendChild(photographerLink)
        article.appendChild(photographerLocation)
        article.appendChild(photographerQuote)
        article.appendChild(photographerPrice)

        return article
    }
    return { getUserCardDOM }
}
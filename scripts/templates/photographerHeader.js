/* eslint-disable no-unused-vars */
function photographerHeaderTemplate(data) {
    const { name, portrait, city, country, tagline} = data

    const picture = `assets/photographers/${portrait}`

    const photographHeader = document.querySelector('.photograph-header')
    const contactBtn = document.querySelector('.contact_button')

    const dataContainer = document.createElement('div')
    const profilePicture = document.createElement('img')
    profilePicture.setAttribute("src", picture)
    profilePicture.setAttribute("alt", name)

    const photographerName = document.createElement('h1')
    photographerName.textContent = name

    const photographerLocation = document.createElement('p')
    photographerLocation.textContent = `${city}, ${country}`
    
    const photographerQuote = document.createElement('p')
    photographerQuote.textContent = tagline

    dataContainer.appendChild(photographerName)
    dataContainer.appendChild(photographerLocation)
    dataContainer.appendChild(photographerQuote)

    photographHeader.appendChild(dataContainer)
    photographHeader.appendChild(contactBtn)
    photographHeader.appendChild(profilePicture)

    return photographHeader
}
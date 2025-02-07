/* eslint-disable no-undef */
async function getPhotographers() {
    const response = await fetch('../../data/photographers.json')
    const data = await response.json()
    const photographers = data.photographers
    return photographers
}

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()

        photographersSection.appendChild(userCardDOM)
    })
}

async function init() {
    const photographers = await getPhotographers()
    displayData(photographers)
}
    
init()
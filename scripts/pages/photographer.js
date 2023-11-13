async function getAllData(currentPhotographerId) {
    const response = await fetch('../../data/photographers.json')
    const data = await response.json()
    const photographerData = data.photographers.filter(photographer => photographer.id === currentPhotographerId)
    const mediaDataList = data.media.filter(photographer => photographer.photographerId === currentPhotographerId)
    
    let totalLikes = 0
    mediaDataList.forEach(mediaData => {
        totalLikes += mediaData.likes
    })

    console.table(mediaDataList)

    return { photographerData, mediaDataList, totalLikes }
}

async function displayPhotographerData(photographerData) {
    photographerHeaderTemplate(photographerData[0])
}

async function displayMediaDataList(mediaDataList) {
    const photographerContent = document.querySelector('.photograph-gallery')

    mediaDataList.forEach(mediaData => {
        const mediaModel = mediaDataListTemplate(mediaData)
        const mediaCardDom = mediaModel.getMediaCardDom()

        photographerContent.appendChild(mediaCardDom)
    })
}

async function displayPhotographerStat(totalLikes, price) {
    const mainSection = document.getElementById('main')
    mainSection.insertAdjacentHTML("beforeend", `
        <div class="photograph-stat">
            <p class="photograph-likes">
                <span class="likes-total">${totalLikes}</span>
                <img                    
                    src="assets/icons/icon-like-black.png" 
                    alt="like icon"
                >
            </p>
            <p class="photograph-price">${price}€ / jour</p>
        </div>
    `)
}

function updateLike(event) {
    const likesCount = event.target.previousSibling
    const likesTotal = document.querySelector('.likes-total')

    if (event.target.classList.contains('liked')) {
        event.target.classList.remove('liked')
        likesCount.textContent = Number(likesCount.textContent) - 1
        likesTotal.textContent = Number(likesTotal.textContent) - 1
    } else {
        event.target.classList.add('liked')
        likesCount.textContent = Number(likesCount.textContent) + 1
        likesTotal.textContent = Number(likesTotal.textContent) + 1
    }
}

// function sortGallery(sortBy) {
//     const mediaDataListSorted = mediaDataList.sort((a, b) => a.date < b.date)
//     console.table(mediaDataListSorted)

//     return { photographerData, mediaDataList, totalLikes }
// }

async function init() {
    const url = new URL(document.location.href)
    const currentPhotographerId = Number(url.searchParams.get('id'))
    
    const { photographerData, mediaDataList, totalLikes } = await getAllData(currentPhotographerId)
    displayPhotographerData(photographerData)
    displayMediaDataList(mediaDataList)
    displayPhotographerStat(totalLikes, photographerData[0].price)
}

init()
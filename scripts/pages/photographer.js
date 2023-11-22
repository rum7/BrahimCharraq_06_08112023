async function getAllData(currentPhotographerId) {
    const response = await fetch('../../data/photographers.json')
    const data = await response.json()
    const photographerData = data.photographers.filter(photographer => photographer.id === currentPhotographerId)
    const mediaDataList = data.media.filter(photographer => photographer.photographerId === currentPhotographerId)
    mediaDataList.sort((a, b) => b.likes - a.likes)

    let totalLikes = 0
    mediaDataList.forEach(mediaData => {
        totalLikes += mediaData.likes
    })

    return { photographerData, mediaDataList, totalLikes }
}

async function displayPhotographerData(photographerData) {
    photographerHeaderTemplate(photographerData[0])
}

async function displayMediaDataList(mediaDataList) {
    const photographerContent = document.querySelector('.photograph-gallery')
    photographerContent.innerHTML = ""
    
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
    const likesCount = event.currentTarget.previousSibling
    const likeSVG = event.currentTarget.firstChild
    const likesTotal = document.querySelector('.likes-total')

    if (likeSVG.classList.contains('liked')) {
        likeSVG.classList.remove('liked')
        likesCount.textContent = Number(likesCount.textContent) - 1
        likesTotal.textContent = Number(likesTotal.textContent) - 1
    } else {
        likeSVG.classList.add('liked')
        likesCount.textContent = Number(likesCount.textContent) + 1
        likesTotal.textContent = Number(likesTotal.textContent) + 1
    }
}

async function openFilterList(event) {
    const currentFilter = event.currentTarget.getElementsByTagName('span')[0].textContent
    const allFilterBtn = Array.from(document.querySelector('.dropdown-item').querySelectorAll('li'))
    allFilterBtn.forEach(filterBtn => {
        if (filterBtn.textContent === currentFilter) {
            filterBtn.classList.add('hide')
        }else {
            filterBtn.classList.remove('hide')
        }
    })

    const dropdownBtn = document.querySelector('.dropdown-btn')
    dropdownBtn.classList.toggle('open')
}

async function closeFilterList(sortBy) {
    const newFilter = document.querySelector('.btn-filter').getElementsByTagName('span')[0]
    newFilter.textContent = sortBy

    const dropdownBtn = document.querySelector('.dropdown-btn')
    dropdownBtn.classList.remove('open')
}

async function sortGallery(event) {
    const sortBy = event.currentTarget.textContent
    const photographerContent = document.querySelector('.photograph-gallery')
    const mediacards = Array.from(document.querySelectorAll('.mediacard'))

    if ( sortBy === "Popularité" ) {
        mediacards.sort((a, b) => Number(b.getAttribute('data-likes')) - Number(a.getAttribute('data-likes')))
    }

    if ( sortBy === "Date" ) {
        mediacards.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'))
            const dateB = new Date(b.getAttribute('data-date'))
            return dateB - dateA
        })
    }

    if ( sortBy === "Titre" ) {
        mediacards.sort((a, b) => a.getAttribute('data-title').localeCompare(b.getAttribute('data-title')))
    }
    
    photographerContent.innerHTML = ""
    mediacards.forEach(mediacard => photographerContent.appendChild(mediacard))

    closeFilterList(sortBy)
}

async function init() {
    const url = new URL(document.location.href)
    const currentPhotographerId = Number(url.searchParams.get('id'))
    
    const { photographerData, mediaDataList, totalLikes } = await getAllData(currentPhotographerId)
    displayPhotographerData(photographerData)
    displayMediaDataList(mediaDataList)
    displayPhotographerStat(totalLikes, photographerData[0].price)

    const selectFilter = document.querySelector('.btn-filter')
    selectFilter.addEventListener('click', openFilterList)

    const btnSortbyLike = document.querySelector('.btn-sortby-like')
    btnSortbyLike.addEventListener('click', sortGallery)
    
    const btnSortbyDate = document.querySelector('.btn-sortby-date')
    btnSortbyDate.addEventListener('click', sortGallery)

    const btnSortbyTitle = document.querySelector('.btn-sortby-title')
    btnSortbyTitle.addEventListener('click', sortGallery)
}

init()
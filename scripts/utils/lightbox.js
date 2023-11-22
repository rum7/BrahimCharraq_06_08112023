const mediaLightbox = document.getElementById('media-lightbox')
const mediaLightboxContent = document.querySelector('.media-content')
let medias = []
let currentMediaIndex = 0
let mediacardsLength = 0

const previousMediaBtn = document.querySelector('.previous-media')
previousMediaBtn.addEventListener('click', previousMedia)
const nextMediaBtn = document.querySelector('.next-media')
nextMediaBtn.addEventListener('click', nextMedia)
const closeLightboxBtn = document.querySelector('.close-media')
closeLightboxBtn.addEventListener('click', closeLightbox)

async function displayMedia(index) {
    let newMedia = null
    medias[index].tagName.toString() === 'IMG' ?
    newMedia = document.createElement('img')
    : newMedia = document.createElement('video')
     
    newMedia.setAttribute('src', medias[index].getAttribute('src'))
    newMedia.setAttribute('alt', medias[index].getAttribute('alt'))
    newMedia.setAttribute('loading', 'lazy')
    if (newMedia.tagName.toString() === 'VIDEO') {
        newMedia.controls = false
        newMedia.autoplay = true
        newMedia.loop = true
        newMedia.muted = true
    }

    let newMediaTitle = document.createElement('h3')
    newMediaTitle.textContent = medias[index].getAttribute('alt')

    mediaLightboxContent.innerHTML = ""
    mediaLightboxContent.appendChild(newMedia)
    mediaLightboxContent.appendChild(newMediaTitle)
}

async function openLightbox(event) {
    const mediaClicked = event.currentTarget.childNodes[0]
    const mediacards = Array.from(document.querySelectorAll('.mediacard'))
    mediacardsLength = mediacards.length
    
    mediacards.forEach(media => medias = [...medias, media.childNodes[0].childNodes[0]])

    currentMediaIndex = medias.indexOf(mediaClicked)
    await displayMedia(currentMediaIndex)
    mediaLightbox.style.display = "flex"
    document.body.style.overflow = "hidden"
}

function previousMedia() {
    currentMediaIndex - 1 < 0 ?
    currentMediaIndex = mediacardsLength - 1
    : currentMediaIndex--
    displayMedia(currentMediaIndex)
}

function nextMedia() {
    currentMediaIndex + 1 > mediacardsLength - 1 ?
    currentMediaIndex = 0
    : currentMediaIndex++
    displayMedia(currentMediaIndex)
}

function closeLightbox() {
    mediaLightbox.style.display = 'none'
    document.body.removeAttribute('style')
    medias = []
}

document.addEventListener('click', (event) => {
    if (event.target === mediaLightbox) {
        closeLightbox()
    }
})


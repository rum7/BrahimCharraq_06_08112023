/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function mediaDataListTemplate(data) {
    const { photographerId, title, image, video, likes, date} = data
    const content = image ?? video
    const mediaPath = `assets/medias/${photographerId}/${content}`

    function getMediaCardDom() {
        // media element + media details container
        const mediaCard = document.createElement('div')
        mediaCard.classList.add('mediacard')
        mediaCard.dataset.title = title
        mediaCard.dataset.likes = likes
        mediaCard.dataset.date = date

        // media element container
        const mediaContainer = document.createElement('button')
        mediaContainer.classList.add('media')

        // media element (image or video)
        let media = null
        content === image ? media = document.createElement('img') : media = document.createElement('video')
        media.classList.add('media-thumbnail')
        media.setAttribute('src', mediaPath)
        media.setAttribute('alt', title)
        media.setAttribute('loading', 'lazy')
        
        //media details (title and likes)
        const details = document.createElement('div')
        details.classList.add('media-details')

        const mediaTitle = document.createElement('h2')
        mediaTitle.classList.add('media-title')
        mediaTitle.textContent = title

        const medialikesCounter = document.createElement('p')
        medialikesCounter.classList.add('media-likes')

        const likesCounter = document.createElement('span')
        likesCounter.classList.add('likes-value')
        likesCounter.textContent = likes

        const likeBtn = document.createElement('button')
        likeBtn.classList.add('likes-icon')

        const likeIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        likeIconSVG.setAttribute('width', "19")
        likeIconSVG.setAttribute('height', "19")
        const likeIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        likeIconPath.setAttribute('d', "M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z")
        
        // wrapping all element to get the card
        // and adding some event listener
        likeIconSVG.appendChild(likeIconPath)
        likeBtn.appendChild(likeIconSVG)
        likeBtn.addEventListener('click', updateLike)

        medialikesCounter.appendChild(likesCounter)
        medialikesCounter.appendChild(likeBtn)

        details.appendChild(mediaTitle)
        details.appendChild(medialikesCounter)

        mediaContainer.appendChild(media)
        mediaContainer.addEventListener('click', openLightbox)

        mediaCard.appendChild(mediaContainer)
        mediaCard.appendChild(details)

        return mediaCard
    }
    return { getMediaCardDom }
}
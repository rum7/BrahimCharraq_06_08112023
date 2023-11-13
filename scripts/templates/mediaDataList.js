function mediaDataListTemplate(data) {
    const { photographerId, title, image, video, likes} = data
    const content = image ?? video
    const picturePath = `assets/pictures/${photographerId}/${content}`

    function getMediaCardDom() {
        const mediaCard = document.createElement('div')

        let picture = null
        content === image ? picture = document.createElement('img') : picture = document.createElement('video')
        picture.classList.add('picture-thumbnail')
        picture.setAttribute('src', picturePath)
        picture.setAttribute('alt', title)
        
        const details = document.createElement('div')
        details.classList.add('picture-details')

        const pictureTitle = document.createElement('h2')
        pictureTitle.classList.add('picture-title')
        pictureTitle.textContent = title

        const picturelikesCounter = document.createElement('p')
        picturelikesCounter.classList.add('picture-likes')

        const likesCounter = document.createElement('span')
        likesCounter.classList.add('likes-value')
        likesCounter.textContent = likes

        const likeIcon = document.createElement('img')
        likeIcon.classList.add('likes-icon')
        likeIcon.setAttribute('src', "assets/icons/icon-like.png")
        likeIcon.setAttribute('alt', "like icon")
        likeIcon.addEventListener('click', updateLike)

        picturelikesCounter.appendChild(likesCounter)
        picturelikesCounter.appendChild(likeIcon)

        details.appendChild(pictureTitle)
        details.appendChild(picturelikesCounter)

        mediaCard.appendChild(picture)
        mediaCard.appendChild(details)

        return mediaCard
    }
    return { getMediaCardDom }
}
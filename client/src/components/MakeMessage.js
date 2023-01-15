const makeMessage = (messageIconStyle, messageIconColor, messageText, messageProgressColor,id) => {
    // message to user
    const messageContainer = document.createElement("div")
    messageContainer.className = "message_container"
    messageContainer.id = id
    const messageIcon = document.createElement("i")
    const message = document.createElement("p")
    const progressBar = document.createElement("div")
    progressBar.className = "message_progress"
    messageIcon.className = messageIconStyle
    message.innerText = messageText
    messageIcon.style.color = messageIconColor
    progressBar.style.background = messageProgressColor
    messageContainer.append(messageIcon)
    messageContainer.append(message)
    messageContainer.append(progressBar)
    document.body.append(messageContainer)
}

export default makeMessage;
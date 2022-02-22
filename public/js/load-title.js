var titleText = ""
var currText = ""
const typeSpeed = 150 // In ms

function registerNewChar() {
    currText = currText + titleText[currText.length]
    $("#title-text").text(currText + ((titleText == currText) ? "" : "|")) 
}

function loadWord(title) {
    titleText = title
    let i = 0
    while (i != titleText.length) {
        setTimeout(registerNewChar, typeSpeed * i)
        i++
    }
}

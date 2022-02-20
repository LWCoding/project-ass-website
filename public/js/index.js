const titleText = "Project ASS"
let currText = ""
const typeSpeed = 150 // In ms

function registerNewChar() {
    currText = currText + titleText[currText.length]
    $("#title-text").text(currText + ((titleText == currText) ? "" : "|")) 
}

let i = 0
while (i != titleText.length) {
    setTimeout(registerNewChar, typeSpeed * i)
    i++
}

let panelPFPsRendered = 0
const panelPFPs = document.getElementsByClassName("panel-pfp");

function checkForAndAnimatePanelPFPs() {
    const windowOffsetTop = window.innerHeight + window.scrollY;
    Array.prototype.forEach.call(panelPFPs, (panelPFP) => {
        const panelPFPOffsetTop = panelPFP.offsetTop;

        if (windowOffsetTop >= panelPFPOffsetTop && !panelPFP.classList.contains("animate__jackInTheBox")) {
            panelPFPsRendered++
            console.log("rendered")
            addClass(panelPFP, "animate__jackInTheBox")
            if (panelPFPsRendered == 3) {
                document.removeEventListener("scroll", checkForAndAnimatePanelPFPs)
            }
        }
    });
}

checkForAndAnimatePanelPFPs()

if (panelPFPsRendered != 3) {
    Array.prototype.forEach.call(panelPFPs, (panelPFP) => {
        panelPFP.style.removeProperty("animation-delay")
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("scroll", checkForAndAnimatePanelPFPs);
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}
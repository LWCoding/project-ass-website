async function checkForData() {
    const res = await fetch("/info")
    if (!res.ok) {
        $("#not-logged-in").removeClass("d-none")
        $("#logged-in").remove()
        $("#account-register-placeholder").load("./partials/register-form.html")
        $("#account-login-placeholder").load("./partials/login-form.html")
        $("#account-login-placeholder").hide()
    } else {
        $("#logged-in").removeClass("d-none")
        $("#not-logged-in").remove()
        const json = await res.json()
        var usernameSpans = document.getElementsByClassName("username")
        for (let i = 0; i < usernameSpans.length; i++) {
            usernameSpans[i].textContent = json.username
        }
        var dateCreatedSpans = document.getElementsByClassName("dateCreated")
        for (let i = 0; i < dateCreatedSpans.length; i++) {
            dateCreatedSpans[i].textContent = new Date(json.createdAt)
        }
    }
}

window.onload = checkForData

async function logout() {
    const res = await fetch("/logout")
    if (res.ok) {
        location.reload()
    }
}
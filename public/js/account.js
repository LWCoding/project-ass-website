function showRegisterForm() {
    $("#account-register-placeholder").removeClass("animate__fadeOut")
    $("#account-hover-block").fadeIn(500)
    $("#account-register-placeholder").show()
    $("#account-login-placeholder").hide()
    $("#page-content").addClass("uninteractable")
}

function showLoginForm() {
    $("#account-login-placeholder").removeClass("animate__fadeOut")
    $("#account-hover-block").fadeIn(500)
    $("#account-login-placeholder").show()
    $("#account-register-placeholder").hide()
    $("#page-content").addClass("uninteractable")
}

function normalizeInputs() {
    $("#new-username-input").hide()
    $("#save-new-username").hide()
    $("#change-username").show()
    $("#username-box").show()
    $("#new-description-input").hide()
    $("#save-new-description").hide()
    $("#change-description").show()
    $("#description-box").show()
}

function editUsername() {
    normalizeInputs()
    $("#new-username-input").val($("#username-box").text())
    $("#new-username-input").show()
    $("#save-new-username").show()
    $("#change-username").hide()
    $("#username-box").hide()
}

function editDescription() {
    normalizeInputs()
    $("#new-description-input").val($("#description-box").text().substring(1, $("#description-box").text().length - 1))
    $("#new-description-input").show()
    $("#save-new-description").show()
    $("#change-description").hide()
    $("#description-box").hide()
}

async function saveUsername() {
    if ($("#new-username-input").val() == $("#username-box").text()) {
        return normalizeInputs()
    }
    if ($("#new-username-input").val().length > 16) {
        return updateError("Your username must be between 1-16 characters long.")
    }
    const res = await fetch("/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: $("#new-username-input").val()
        })
    })
    if (!res.ok) {
        let json = await res.json()
        updateError(json.msg)
    } else {
        updateSuccess("Successfully updated your information!")
        checkForData()
    }
    normalizeInputs()
}

async function saveDescription() {
    if ($("#new-description-input").val() == $("#description-box").text()) {
        return normalizeInputs()
    }
    const res = await fetch("/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: $("#new-description-input").val()
        })
    })
    if (!res.ok) {
        updateError("Your description must be in between 1-180 characters long.")
    } else {
        updateSuccess("Successfully updated your information!")
        checkForData()
    }
    normalizeInputs()
}

function updateSuccess(successMessage) {
    successText = document.getElementById("update-success-message")
    successText.style.display = "block"
    successText.classList.remove("animate__fadeOut")
    successText.classList.add("animate__fadeIn")
    successText.textContent = successMessage
    setTimeout(() => {
        successText.classList.add("animate__fadeOut")
        successText.classList.remove("animate__fadeIn")
    }, 2500)
    setTimeout(() => {
        successText.style.display = "none"
    }, 3250)
}

function updateError(errorMessage) {
    errorText = document.getElementById("update-error-message")
    errorText.style.display = "block"
    errorText.classList.remove("animate__fadeOut")
    errorText.classList.add("animate__fadeIn")
    errorText.textContent = errorMessage
    setTimeout(() => {
        errorText.classList.add("animate__fadeOut")
        errorText.classList.remove("animate__fadeIn")
    }, 2500)
    setTimeout(() => {
        errorText.style.display = "none"
    }, 3250)
}
function dark_mode_first_time() {

    const cookie = document.cookie
    if (cookie == "darkmode=0") {
        const darkmode_checkbox = document.querySelector("#darkmode-checkbox")
        darkmode_checkbox.checked = false
    }
    /* else: it is checked by default, do nothing */

    toggle_dark_mode()

}

function toggle_dark_mode() {
    const checked = document.querySelector("#darkmode-checkbox").checked

    var bgcol = ""
    var textcol = ""
    var inputcol = ""
    var buttoncol = ""
    // var bordercol = ""

    if (checked) {
        bgcol = "black"
        textcol = "white"
        inputcol = "#222222"
        buttoncol = "#222222"
        // bordercol = "gray"

        document.cookie = "darkmode=1"
    } else {
        bgcol = "white"
        textcol = "black"
        inputcol = "white"
        buttoncol = "lightgray"
        // bordercol = "black"

        document.cookie = "darkmode=0"
    }

    const body = document.querySelector("body")
    body.style.backgroundColor = bgcol
    body.style.color = textcol

    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        input.style.backgroundColor = inputcol
        input.style.color = textcol
        // input.style.borderColor = bordercol
    });

    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
        button.style.color = textcol
        button.style.backgroundColor = buttoncol
    });
}

function enable_dark_mode() {
}



/******************************************************************************/
document.addEventListener("DOMContentLoaded", dark_mode_first_time)

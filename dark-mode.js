
/* number of days before the dark mode cookie expires */
const DARK_MODE_COOKIE_DAYS = 14

/**
 * run this function only once upon loading the page
 */
function dark_mode_first_time() {

    /**
     * By default, darkmode is enabled and the checkbox checked. If the user
     * was using light mode the last time, uncheck the darkmode checkbox.
     */
    const darkmodecookie = get_cookie("darkmode")
    if (darkmodecookie == "0") {
        const darkmode_checkbox = document.querySelector("#darkmode-checkbox")
        darkmode_checkbox.checked = false
    }

    toggle_dark_mode()

}

function toggle_dark_mode() {
    const checked = document.querySelector("#darkmode-checkbox").checked

    var bgcol = ""
    var textcol = ""
    var inputcol = ""
    var btncol = ""
    var btncolhov = ""  // hover
    var bordercol = ""

    if (checked) {  // darkmode

        bgcol = "black"
        textcol = "white"
        inputcol = "#222222"
        btncol = "#222222"
        btncolhov = "#333333"
        bordercol = "gray"

        set_cookie("darkmode", "1", DARK_MODE_COOKIE_DAYS)

    } else {  // lightmode

        bgcol = "white"
        textcol = "black"
        inputcol = "white"
        btncol = "lightgray"  // same as #D3D3D3
        btncolhov = "#C3C3C3"
        bordercol = "black"

        set_cookie("darkmode", "0", DARK_MODE_COOKIE_DAYS)
    }

    /* body background color and text color */
    const body = document.querySelector("body")
    body.style.backgroundColor = bgcol
    body.style.color = textcol

    /* text input fields */
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        input.style.backgroundColor = inputcol
        input.style.color = textcol
        input.style.border = "1px solid " + bordercol
    });

    /* buttons */
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
        button.style.color = textcol
        button.style.backgroundColor = btncol
        button.style.border = "1px solid " + bordercol
        button.addEventListener("mouseenter", function(event) {
            button.style.backgroundColor = btncolhov
        })
        button.addEventListener("mouseleave", function(event) {
            button.style.backgroundColor = btncol
        })
    });
}




/******************************************************************************/
document.addEventListener("DOMContentLoaded", dark_mode_first_time)

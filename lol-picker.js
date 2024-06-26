const NUMBER_OF_ROWS = 5
const NUMBER_OF_ROLES = 5
const ROLES = [
    "bot",
    "supp",
    "jg",
    "mid",
    "top",
]

function fill_table() {
    const table_body = document.querySelector("#names-and-checkboxes tbody")

    for (let i = 1; i <= NUMBER_OF_ROWS; i++) {
        const row = document.createElement("tr")

        /* player name */
        const table_elem = document.createElement("td")
        const player_name = document.createElement("input")
        player_name.setAttribute("id", `player${i}-name`)
        table_elem.appendChild(player_name)
        row.appendChild(table_elem)

        /* checkboxes */
        for (let j = 0; j < NUMBER_OF_ROLES; j++) {

            const role = ROLES[j]
            const table_elem = document.createElement("td")
            const check_box = document.createElement("input")
            check_box.setAttribute("id", `player${i}-${role}`)
            check_box.setAttribute("type", "checkbox")
            table_elem.appendChild(check_box)
            row.appendChild(table_elem)
        }

        table_body.appendChild(row)
    }
}

function generate_button() {
    console.log("generate button was pressed")
}

/******************************************************************************/
document.addEventListener("DOMContentLoaded", fill_table)

const NUMBER_OF_PLAYERS = 5

const NUMBER_OF_ROLES = 5
const ROLES = [
    "bot",
    "supp",
    "jg",
    "mid",
    "top",
]

function get_random(list) {
    return list[Math.floor((Math.random()*list.length))];
}

function fill_table() {
    const table_body = document.querySelector("#names-and-checkboxes tbody")

    for (let i = 1; i <= NUMBER_OF_PLAYERS; i++) {
        const row = document.createElement("tr")

        /* player name */
        const table_elem = document.createElement("td")
        const player_name = document.createElement("input")
        player_name.setAttribute("id", `player${i}-name`)
        player_name.setAttribute("tabindex", i)
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
    const roles_elem = document.getElementById("generated-roles")
    roles_elem.innerHTML = ""

    const players = []

    /* select non-empty players */
    for (let i = 1; i <= NUMBER_OF_PLAYERS; i++) {
        const player_name = document.querySelector(`#player${i}-name`)
        if (player_name.value != "") {
            players.push(i)
        }
    }

    /* generate a dictionary of roles for each player */
    const player_roles = {}
    players.forEach(player => {

        /* obtain player name */
        let player_name = document.getElementById(`player${player}-name`)
        player_name = player_name.value


        /* add all the roles checked for this player */
        player_roles[player_name] = []
        ROLES.forEach(role => {
            role_checkbox = document.getElementById(`player${player}-${role}`)
            if (role_checkbox.checked) {
                player_roles[player_name].push(role)
            }
        })

    })

    /**
     * in this loop, dictionary mutates
     * from {player: [role1, role2, ...], ...}
     * to {player: role, ...}
    */
    const picked_roles = [];
    for (let player_name in player_roles) {

        /* pick a random role for player, if role occupied, repeat */
        let done = false;
        while (!done) {
            const role = get_random(player_roles[player_name])
            if (!picked_roles.includes(role)) {
                picked_roles.push(role)
                player_roles[player_name] = role
                done = true
            }
        }
    }

    for (let player_name in player_roles) {
        const text = `${player_name}: ${player_roles[player_name]}`
        const text_elem = document.createElement("p")
        text_elem.textContent = text
        roles_elem.appendChild(text_elem)
    }
    console.log("players: ", players)
    console.log("roles: ", player_roles)

}

/******************************************************************************/
document.addEventListener("DOMContentLoaded", fill_table)

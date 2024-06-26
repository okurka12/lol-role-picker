/* safety counter: if there are two people who only want to play bot, for
example, the while loop loops indefinitely, because it is undecidable. set
a maximum number of iterations */
const MAX_ITERATIONS = 250

const NUMBER_OF_PLAYERS = 5

const NUMBER_OF_ROLES = 5
const ROLES = [
    "bot",
    "supp",
    "jg",
    "mid",
    "top",
]

UNDECIDED_ROLE = "🤷‍♀️"

/* get a random item from an array */
function get_random(list) {
    if (list.length === 0) {
        return UNDECIDED_ROLE
    }
    return list[Math.floor((Math.random()*list.length))];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
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
    /* also generate a list of players */
    const player_names = []
    const player_roles = {}
    players.forEach(player => {

        /* obtain player name */
        let player_name = document.getElementById(`player${player}-name`)
        player_name = player_name.value


        /* add all the roles checked for this player */
        player_names.push(player_name)
        player_roles[player_name] = []
        ROLES.forEach(role => {
            role_checkbox = document.getElementById(`player${player}-${role}`)
            if (role_checkbox.checked) {
                player_roles[player_name].push(role)
            }
        })

    })

    shuffle_array(player_names)

    /**
     * in this loop, dictionary mutates
     * from {player: [role1, role2, ...], ...}
     * to {player: role, ...}
    */
    const picked_roles = [];
    player_names.forEach(player_name => {

        /* pick a random role for player, if role occupied, repeat */
        let done = false
        let safety_counter = 0
        while (!done) {
            const role = get_random(player_roles[player_name])
            if (!picked_roles.includes(role)) {
                picked_roles.push(role)
                player_roles[player_name] = role
                done = true
            }

            /* stop iteration if the proposal is (probably) undecidable */
            safety_counter++
            if (safety_counter == MAX_ITERATIONS) {
                player_roles[player_name] = UNDECIDED_ROLE
                done = true
            }

        }
    });

    for (let player_name in player_roles) {
        const text = `${player_name}: ${player_roles[player_name]}`
        const text_elem = document.createElement("p")
        text_elem.textContent = text
        roles_elem.appendChild(text_elem)
    }

}

/******************************************************************************/
document.addEventListener("DOMContentLoaded", fill_table)

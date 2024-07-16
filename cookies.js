/**
 * get the URI
 * for http://localhost:8000/ it will be '/'
 * for https://vitapavlik.cz/lol-role-picker/ it will be '/lol-role-picker/'
 */
PATH = location.pathname

/**
 * Sets a cookie. Name cannot begin or end with whitespace, but can contain
 * any characters. Cookie value has no limitations.
 * Both name and value are encoded, so it's safe to use characters
 * like '=' or ';'
 *
 * @note sets a cookie with `path` equal to current URI
 *
 * @param {string} cname cookie name
 * @param {string} cvalue cookie value
 * @param {number} exdays days before expiration
 */
function set_cookie(cname, cvalue, exdays) {
    cname = encodeURIComponent(cname.trim())
    cvalue = encodeURIComponent(cvalue)

    const date = new Date()
    date.setTime(date.getTime() + (exdays*24*60*60*1000))

    let expires = "expires=" + date.toUTCString()

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + PATH
}

/**
 * Get a value of cookie that was set by `set_cookie`
 *
 * @param {string} cname
 * @returns {string} value of the cookie or empty string if cookie existsn't
 */
function get_cookie(cname) {

    const all_cookies = document.cookie
    const splitted = all_cookies.split(";")

    /* array.foreach cannot be used here */
    for (var i = 0; i < splitted.length; i++) {

        c = splitted[i]

        cnn = encodeURIComponent(cname.trim())
        cn = c.split("=")[0].trim()

        if (cn == cnn) {
            /* cookie was found */
            return decodeURIComponent(c.split("=")[1])
        }
    }

    /* cookie was not found */
    return ""
}

/**
 * deletes a coookue
 * @param {string} cname cookie name
 */
function delete_cookie(cname) {
    document.cookie = encodeURIComponent(cname) +
                    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=" + PATH
}

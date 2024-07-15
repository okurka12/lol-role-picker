function set_cookie(cname, cvalue, exdays) {
    cname = encodeURIComponent(cname)
    cvalue = encodeURIComponent(cvalue)

    const date = new Date()
    date.setTime(date.getTime() + (exdays*24*60*60*1000))

    let expires = "expires=" + date.toUTCString()

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function get_cookie(cname) {
    const all_cookies = document.cookie
    const splitted = all_cookies.split(";")
    splitted.forEach(c => {
        cn = decodeURIComponent(c.split("=")[0]).trim()
        cnn = encodeURIComponent(cname.trim())
        console.log(cn)
        console.log(cnn)
        if (cn == cnn) {
            console.log("returning " + c.split("=")[1])
            return c.split("=")[1]
        }
    });
    return ""
}

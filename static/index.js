//Jonathan Zavialov

async function boot(){
    bootScreen = await document.getElementById("bootScreen")
    bootScreen.innerHTML += "<p>test</p>"
}

async function loadNav(){
    navBarHTML = `
        <ul class=\"tree-view\">
            <li><a href=\"/home\">Home</a></li>
            <li><a href=\"https://github.com/JonZavialov/portfolio2\" target=\"_blank\">Repository</a></li>
        </ul>
    `

    navBar = await document.getElementById("sidenav")
    navBar.innerHTML += navBarHTML
}

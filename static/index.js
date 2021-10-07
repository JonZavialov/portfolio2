//Jonathan Zavialov

async function replaceBootScreen(){
    window.location.replace("/boot")
}

async function boot(){
    bootScreen = await document.getElementById("bootScreen")
    bootScreen.innerHTML += "<p>test</p>"
}

async function loadNav(){
    navBarHTML = `
    <div class=\"sidenav\">
        <ul class=\"tree-view\">
            <li><a href=\"/\">Home</a></li>
            <li><a href=\"https://github.com/JonZavialov/portfolio2\" target=\"_blank\">Repository</a></li>
        </ul>
    </div>
    `

    navBar = await document.getElementById("nav")
    navBar.innerHTML += navBarHTML
}

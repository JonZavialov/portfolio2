async function render(){
    if(!detectMob()){
        loadDesktopNav()
    }else{
        transformToMobile()
    }
}

async function transformToMobile(){
    var doc = document.getElementById("body")
    doc.style.backgroundColor = "black"
    doc.innerHTML= `
    <div id=\"error\">
        <div id = "errorWindow" class="window" style="margin: 32px; width: 250px">
        <div class="title-bar">
        <div class="title-bar-text">
            Jonathan Zavialov
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="closeWindow('errorWindow')" aria-label="Close"></button>
        </div>
        </div>
        <div class="window-body">
        <p>This website is only available on desktop.</p>
        <section class="field-row" style="justify-content: flex-end">
            <button onclick="closeWindow('error')">OK</button>
        </section>
        </div>
        </div>
    </div>
    `
}

async function loadDesktopNav(){
    let navBarDesktop = `
        <ul class=\"tree-view\">
            <li><a href=\"/home\">Home</a></li>
            <li><a href=\"https://github.com/JonZavialov/portfolio2\" target=\"_blank\">Repository</a></li>
        </ul>
    ` 
    let navBar = await document.getElementById("sidenav")
    navBar.innerHTML += navBarDesktop
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ]
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
    })
}


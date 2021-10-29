async function startMenu(){
    console.log('creating start menu')
    //await sleep(.01)
    if(document.getElementById("startMenu")) return
    let main = document.getElementById("main")
    let element = document.createElement("div")
    element.id = "startMenu"
    element.className = "window"
    element.innerHTML = `
    <div class="title-bar">
        <div class="title-bar-text">
            Windows98
        </div>
    </div>
    <div id="startMenuBody">
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('email')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/mail.png?raw=true">
            <p id="startMenuPairText">Email Me</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('linkedin')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/linkedin.png?raw=true">
            <p id="startMenuPairText">Linkedin</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('insta')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/instagram.png?raw=true">
            <p id="startMenuPairText">Instagram</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('youtube')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/youtube.png?raw=true">
            <p id="startMenuPairText">Youtube</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('github')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/documents.png?raw=true">
            <p id="startMenuPairText">GitHub</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('credits')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/credits.png?raw=true">
            <p id="startMenuPairText">Credits</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('shutdown')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/shutdown.png?raw=true">
            <p id="startMenuPairText">Shut Down...</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
    </div>
    `
    main.appendChild(element)

    let startButton = document.getElementById("startButton")
    startButton.onclick =function() { closeButton() }
}

async function closeButton(){
    console.log('deleting start menu')
    document.getElementById("startMenu").remove()
    let startButton = document.getElementById("startButton")
    startButton.onclick =function() { startMenu() }
}

async function startMenuButton(button){
    let methods = {
        "email": emailButton(),
        "linkedin": linkedin(),
        "insta": insta(),
        "youtube": youtube(),
        "github": github(),
        "credits": credits(),
        "shutdown": shutdown()
    }
    let methodNames = Object.keys(methods)
    if(methodNames.indexOf(button) != -1) methods[button]
}

async function emailButton(){
    console.log('email button pressed')
}

async function linkedin(){
    console.log('linkedin button pressed')
}

async function insta(){
    console.log('insta button pressed')
}

async function youtube(){
    console.log('youtube button pressed')
}

async function github(){
    console.log('github button pressed')
}

async function credits(){
    console.log('credits button pressed')
}

async function shutdown(){
    console.log('shutdown button pressed')
}
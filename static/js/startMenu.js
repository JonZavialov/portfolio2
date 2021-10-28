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
        <div class="hoverHighlight" id="startMenuPair">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/mail.png?raw=true">
            <p id="startMenuPairText">Email Me</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/linkedin.png?raw=true">
            <p id="startMenuPairText">Linkedin</p>
            <p id="startMenuArrow">&#9654</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/credits.png?raw=true">
            <p id="startMenuPairText">Credits</p>
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
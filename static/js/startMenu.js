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
        <p>Souse</p>
    </div>
    `
    main.appendChild(element)

    let startButton = document.getElementById("startButton")
    startButton.onclick =function() { closeButton() }
}

async function startMenuListener(){
    main.onclick = function (e) {
        if(e.target.closest("#startMenu") || !document.getElementById("startMenu") || e.target.closest("#startButton")) return
        console.log('clicked main')
        closeButton()
    }
}

async function closeButton(){
    console.log('deleting start menu')
    document.getElementById("startMenu").remove()
    let startButton = document.getElementById("startButton")
    startButton.onclick =function() { startMenu() }
}
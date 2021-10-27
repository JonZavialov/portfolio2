async function startMenu(){
    let main = document.getElementById("main")
    let element = document.createElement("div")
    element.id = "startMenu"
    element.className = "window"
    element.innerHTML = `
    <div class="window-body">
        <div class="title-bar">
            <div class="title-bar-text">
                Windows98
            </div>
        </div>
        <div id="startMenuBody">
            <p>Souse</p>
        </div>
    </div>
    `
    main.appendChild(element)
}
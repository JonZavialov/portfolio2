function rightClick(){
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault()
    }, false)

    let body = document.getElementById("body")
    body.onmousedown = function(e) {
        if(!e.target.closest("#rightClickMenu")){
            var rightClickMenus = document.querySelectorAll( '[id^=rightClickMenu]' )
            for( i=0; i<rightClickMenus.length; i++ ) {
                rightClickMenus[i].remove()
            }
        }
        if(e.button == 2 && !e.target.closest("#rightClickMenu")) renderRightClick()
    }
}

async function renderRightClick(){
    let body = document.getElementById("body")

    element = document.createElement('div')
    element.className = "window"
    element.id = "rightClickMenu"
    element.innerHTML = `
    <div class="window-body">
        <p onclick="location.reload()" id="menuItem">Reload</p>
        <hr>
        <p id="menuItem">Arrange Icons</p>
        <p id="menuItem">Line up Icons</p>
        <hr>
        <p id="menuItem">Paste</p>
        <p id="menuItem">Paste Shortcut</p>
        <p id="menuItem">Undo</p>
        <hr>
        <p id="menuItem">New</p>
        <hr>
        <p id="menuItem">Properties</p>
    </div>
    `
    element.style.left = window.event.pageX + window.pageXOffset + 'px'
    element.style.top = window.event.pageY + window.pageYOffset + 'px'
    body.appendChild(element)
}
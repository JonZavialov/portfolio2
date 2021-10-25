function initDraw() {
    let canvas = document.getElementById("main")
    let body = document.getElementById("body")
    if(!canvas) return

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    }

    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset - 216
            mouse.y = ev.pageY + window.pageYOffset - 10
        }
    }

    var element = null
    canvas.onmousemove = function (e) {
        setMousePosition(e)
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
        }
    }

    canvas.onmousedown = function (e) {
        if(e.target.closest("#icon") || e.target.closest("#aboutme") || e.target.closest("#taskbar")) return
        mouse.startX = mouse.x
        mouse.startY = mouse.y
        element = document.createElement('div')
        element.className = 'rectangle'
        element.style.left = mouse.x + 'px'
        element.style.top = mouse.y + 'px'
        canvas.appendChild(element)
    }

    body.onmouseup = function (e){
        if(element) element.remove()
        
        //check for drawn rectangles and remove them
        var rectangles = document.getElementsByClassName( 'rectangle' )
        for( i=0; i<rectangles.length; i++ ) {
            rectangles[i].remove()
        }
    }
}
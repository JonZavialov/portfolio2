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
        checkCollide()
        setMousePosition(e)
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
        }
    }

    canvas.onmousedown = function (e) {
        let noSelect = [
            "#icon",
            "#aboutme",
            "#taskbar",
            "#jonpng",
            "#errorWindow",
            "#startMenu",
            "#credits",
            "#recycleBin",
            "#myComputer",
            "#myDocuments",
            "#txtEditor"
        ]
        if(e.button != 0) return
        for(let i = 0; i < noSelect.length; i++){
            if(e.target.closest(noSelect[i])) return
        }
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

doElsCollide = function(el1, el2) {
    if(!el1 || !el2) return
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
}

async function checkCollide(){
    var icons = document.querySelectorAll( '[id^=icon]' )
    for( i=0; i<icons.length; i++ ) {
        let collide = doElsCollide(document.getElementsByClassName("rectangle")[0],icons[i])
        if(collide){
            let parent = icons[i].parentElement.parentElement.parentElement.className
            if((icons[i].style.borderColor == "transparent" || icons[i].style.borderColor == "") && parent.indexOf("window") == -1){
                icons[i].style.borderColor = "white"
            }
        }
    }
}
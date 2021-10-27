//Jonathan Zavialov

async function addIconProperties(){
    var icons = document.querySelectorAll( '[id^=icon]' )
    for( i=0; i<icons.length; i++ ) {
        icons[i].setAttribute( "onclick", `border(\"${icons[i].className}\")` )
    }

    document.addEventListener("click", function(event) {
        if (event.target.closest("#icon")) return
        removeBorders()
    })
}

async function closeWindow(windowID){
    console.log(`closing ${windowID}`)
    document.getElementById(windowID).remove()
}

async function closeClassWindow(windowClass){
    let element = document.getElementsByClassName(windowClass)[0]
    console.log(`closing ${element.id}`)
    element.remove()
}

async function border(name){
    let icon = document.getElementsByClassName(name)[0]
    if(icon.style.borderColor == "transparent" || icon.style.borderColor == ""){
        removeBorders()
        icon.style.borderColor = "white"
    }else{
        icon.style.borderColor = "transparent"
        
        if (icon.className == "jonpng"){
            jonpng()
        }
    }
}

async function jonpng(){
    let numOfPngWindows = document.getElementsByClassName("jonpngWindow").length

    let main = document.getElementById('main')
    let element = document.createElement('div')
    element.className += `jonpng${numOfPngWindows} window jonpngWindow`
    element.id = "jonpng"
    element.style.width = "fit-content"
    element.style.height = "fit-content"
    element.innerHTML = `
    <div id="jonpngheader" class="title-bar jonpng${numOfPngWindows}header">
        <div class="title-bar-text">
        jon.png
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="closeClassWindow('jonpng${numOfPngWindows}')" aria-label="Close"></button>
        </div>
    </div>
    <div class="window-body">
        <img style="width: 200px" src="https://github.com/JonZavialov/portfolio2/blob/main/assets/jon.png?raw=true">
        <section class="field-row" style="justify-content: flex-end">
        </section>
    </div>
    `
    await main.appendChild(element)
    dragElement(document.getElementsByClassName(`jonpng${numOfPngWindows}`)[0],0,true)
}

async function removeBorders(){
    var icons = document.querySelectorAll( '[id^=icon]' )
    for( i=0; i<icons.length; i++ ) {
        icons[i].style.borderColor = "transparent"
    }
}

async function date(){
    let dateDisplay = document.getElementById("ticker")
    
    var i = 1
    function dateLoop(){
        setTimeout(function(){
            if(!document.getElementById("ticker")) return
            let date = new Date().toLocaleTimeString()
            dateDisplay.innerHTML = `<b>${date}</b>`
            i++
            dateLoop()
        }, 1000)
    }
    dateLoop()
}

async function sleep(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(async function() {
            resolve()
        },ms)
    })
}
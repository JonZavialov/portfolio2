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
    let content = "<img style=\"width: 200px\" src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/jon.png?raw=true\">"
    openWindow(content,"jonpng","jon.png")
}

async function credits(){
    let content = "insert credits here"
    openWindow(content,"credits","credits.txt")
}

async function removeBorders(){
    var icons = document.querySelectorAll( '[id^=icon]' )
    for( i=0; i<icons.length; i++ ) {
        icons[i].style.borderColor = "transparent"
    }
}

async function openWindow(content,name,title){
    //important: name header name+header and 
    let numOfWindows = document.getElementsByClassName(`${name}Window`).length

    let html = `
    <div id="${name}header" class="title-bar ${name}${numOfWindows}header">
        <div class="title-bar-text">
        ${title}
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="closeClassWindow('${name}${numOfWindows}')" aria-label="Close"></button>
        </div>
    </div>
    <div class="window-body">
    ${content}
    <section class="field-row" style="justify-content: flex-end">
    </section>
    </div>
    `

    let main = document.getElementById('main')
    let element = document.createElement('div')
    element.className += `${name}${numOfWindows} window ${name}Window`
    element.id = name
    element.style.width = "fit-content"
    element.style.height = "fit-content"
    element.innerHTML = html
    await main.appendChild(element)
    dragElement(document.getElementsByClassName(`${name}${numOfWindows}`)[0],0,true)
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
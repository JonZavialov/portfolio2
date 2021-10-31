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

async function closeWindow(windowID,name = false){
    console.log(`closing ${windowID}`)
    document.getElementById(windowID).remove()
    if(name){
        taskbarClose(name)
    }
}

async function closeClassWindow(windowClass, name = false){
    console.log("running")
    let element = document.getElementsByClassName(windowClass)[0]
    console.log(`closing ${element.id}`)
    element.remove()
    if(name){
        taskbarClose(name)
    }
}

async function border(name){
    let icon = document.getElementsByClassName(name)[0]
    if(icon.style.borderColor == "transparent" || icon.style.borderColor == ""){
        removeBorders()
        let parent = icon.parentElement.parentElement.parentElement.className
        if(parent.indexOf("window") != -1) icon.style.borderColor = "blue"
        else icon.style.borderColor = "white"
    }else{
        icon.style.borderColor = "transparent"
        
        if (icon.className == "jonpng" || icon.className == "jonpngDocs") jonpng()
        else if (icon.className == "credits" || icon.className == "creditsDocs") credits()
        else if (icon.className == "recycle") recycleBin()
        else if (icon.className == "computer") myComputer()
        else if (icon.className == "docs") myDocuments()
        else if (icon.className == "txtEditor") txtEditor()
    }
}

async function txtEditor(){
    let content =`
    <textarea></textarea>
    `
    openWindow(content,"txtEditor","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true\">&nbsp&nbspText Editor",[150,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true","Text Editor","txtEditor")
}

async function myDocuments(){
    let content = `<div id="myDocumentsBody">
        <div id="icon" class="jonpngDocs">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/image.png?raw=true" style="width: 47.99px">
            <p style="color:black">jon.png</p>
        </div>
        <div id="icon" class="creditsDocs">
          <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true">
          <p style="color:black">credits.txt</p>
        </div>
    </div>`
    openWindow(content,"myDocuments","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/documents.png?raw=true\">&nbsp&nbspMy Documents",[100,300],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/documents.png?raw=true","My Documents","myDocuments")
}

async function myComputer(){
    let content = `<div id="myComputerBody">
        <div id="icon" class="driveC">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/drive.png?raw=true">
            <p style="color: black">Storage (C:)</p>
        </div>
        <div id="icon" class="driveFloppy">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/driveFloppy.png?raw=true">
            <p style="color: black">3.5 Floppy (A:)</p>
        </div>
    </div>`
    openWindow(content,"myComputer","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/computer.png?raw=true\">&nbsp&nbspMy Computer",[100,200],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/computer.png?raw=true","My Computer","myComputer")
}

async function jonpng(){
    let content = "<img style=\"width: 200px\" src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/jon.png?raw=true\">"
    openWindow(content,"jonpng","jon.png",[100,100],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/image.png?raw=true","Image Viewer","jonpng")
}

async function recycleBin(){
    let content = "<div id=\"recycleBinBody\"></div>"
    openWindow(content,"recycleBin","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/recycle.png?raw=true\">&nbsp&nbspRecycle Bin",[200,100],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/recycle.png?raw=true","Recycle Bin","recycleBin")
}

async function credits(){
    let url = 'https://api.github.com/repos/JonZavialov/portfolio2/contents/assets/textFiles/credits.txt'
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        let content = `<p>${atob(out.content)}</p>`
        content = content.replace(/(?:\r\n|\r|\n)/g, '<br>')
        openWindow(content,"credits","credits.txt",[300,300],true)
        taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true","Text Viewer","credits")
    }) 
}

async function removeBorders(){
    var icons = document.querySelectorAll( '[id^=icon]' )
    for( i=0; i<icons.length; i++ ) {
        icons[i].style.borderColor = "transparent"
    }
}

async function taskbarUpdate(img,name,codeName){
    var taskbarItems = document.getElementsByClassName(`${codeName}taskbarItem`)
    if(taskbarItems.length != 0) return 
    
    let taskbar = document.getElementById("taskbarBody")
    let element = document.createElement("button")
    element.id = "taskbarItem"
    element.className = `${codeName}taskbarItem`
    element.innerHTML = `
    <img src="${img}">
    <p>${name}</p>
    `
    taskbar.appendChild(element)
}

async function taskbarClose(name){
    var windows = document.querySelectorAll( `[id^=${name}]` )
    if(windows.length != 0) return
    var taskbarItems = document.getElementsByClassName(`${name}taskbarItem`)
    Array.prototype.forEach.call(taskbarItems, function(taskbarItem){
        taskbarItem.remove()
    })
}

async function openWindow(content,name,title,coords,taskbar = false){
    //important: name header name+header and 
    let numOfWindows = document.getElementsByClassName(`${name}Window`).length
    let taskbarName = ""
    if(taskbar) taskbarName = `,'${name}'`

    let html = `
    <div id="${name}header" class="title-bar ${name}${numOfWindows}header">
        <div class="title-bar-text">
        ${title}
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="closeClassWindow('${name}${numOfWindows}'${taskbarName})" aria-label="Close"></button>
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
    element.style.left = coords[0] + "px"
    element.style.top = coords[1] + "px"
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
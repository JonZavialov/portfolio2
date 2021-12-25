//Jonathan Zavialov

async function closeWindow(windowID,name = false){
    document.getElementById(windowID).remove()
    if(name){
        taskbarClose(name)
    }
}

async function closeClassWindow(windowClass, name = false){
    let element = document.getElementsByClassName(windowClass)[0]
    console.log(`closing ${element.id}`)
    element.remove()
    if(name){
        taskbarClose(name)
    }
}

async function closeTxtEditor(){
    let txtContent = document.getElementsByTagName("textarea")[0].value
    if(txtContent == "") closeWindow("txtEditor","txtEditor")
    else{
        //check if error window is already open
        var windows = document.querySelectorAll( `[id^=errorWindowTxt]` )
        if(windows.length == 0) openWindow("You have unsaved changes!","errorWindowTxt","Error",[200,200],false,`<button onclick=\"saveTxt()\">Save</button><button onclick=\"closeWindow('txtEditor','txtEditor');closeWindow('errorWindowTxt')\">OK</button>`)
    }
}

async function saveTxt(){
    closeWindow('errorWindowTxt')
    let txtContent = document.getElementsByTagName("textarea")[0].value

    var pom = document.createElement('a')
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
    
    encodeURIComponent(txtContent))
    pom.setAttribute('download', "myFile")
    
    pom.style.display = 'none'
    document.body.appendChild(pom)
    
    pom.click()
    
    document.body.removeChild(pom)
    closeWindow('txtEditor','txtEditor')
}

async function border(name){
    if(!name) return
    let icon = document.getElementsByClassName(name)[0]
    if(icon.style.borderColor == "transparent" || icon.style.borderColor == ""){
        removeBorders()
        let parent = icon.parentElement.parentElement.parentElement.className
        if(parent.indexOf("window") != -1) icon.style.borderColor = "blue"
        else icon.style.borderColor = "white"
    }else{
        icon.style.borderColor = "transparent"
        
        if (icon.className == "jonpng" || icon.className.indexOf("jonpngDocs") != -1) jonpng()
        else if (icon.className == "credits" || icon.className.indexOf("creditsDocs") != -1) credits()
        else if (icon.className == "txtEditor" || icon.className.indexOf("txtEditorApps") != -1) txtEditor()
        else if (icon.className == "calculator" || icon.className.indexOf("calculatorApps") != -1) openCalculator()
        else if (icon.className == "resume" || icon.className.indexOf("resumeDocs") != -1) resume()
        else if(icon.className == "calendar" || icon.className.indexOf("calendarApps") != -1) initCalendar()
        else if(icon.className == "email" || icon.className.indexOf("emailApps") != -1) initEmail()
        else if(icon.className == "msdos" || icon.className.indexOf("msdosApps") != -1) initMsdos()
        else if (icon.className == "apps") apps()
        else if (icon.className == "recycle") recycleBin()
        else if (icon.className == "computer") myComputer()
        else if (icon.className == "docs") myDocuments()
        else if (icon.className == "nft") nft()
    }
}

async function openAppOnStart(appName){
    closeWindow("aboutme")
    if(appName == "jonpng") jonpng()
    else if(appName == "credits") credits()
    else if(appName == "txtEditor") txtEditor()
    else if(appName == "calculator") openCalculator()
    else if(appName == "resume") resume()
    else if(appName == "apps") apps()
    else if(appName == "recycle") recycleBin()
    else if(appName == "computer") myComputer()
    else if(appName == "docs") myDocuments()
    else if(appName == "nft") nft()
    else if(appName == "calendar") initCalendar()
    else if(appName == "email") initEmail()
    else if(appName == "msdos") initMsdos()
    else window.location.replace("/404")
}

async function nft(){
    let content = `
    <div id = 'nftsbody'>
        ${await getNftsFormatted(document.getElementsByClassName(`nftsWindow`).length)}
    </div>
    `
    openWindow(content,"nfts","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/nftview.png?raw=true\">&nbsp&nbspMy NFTs",[200,10],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/nftview.png?raw=true","My NFTs","nfts")
}

async function txtEditor(){
    //check if any text editors are already open
    var windows = document.querySelectorAll( `[id^=txtEditor` )
    if(windows.length != 0){ 
        throwError("You already have a text editor open!") 
        return
    }

    let content =`
    <textarea></textarea>
    `
    openWindow(content,"txtEditor","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true\">&nbsp&nbspText Editor",[150,250],true,"","closeTxtEditor()")
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true","Text Editor","txtEditor")
}

async function apps(){
    let numApps = await getNumberOfIcons("calculatorApps")
    let content = `<div id="myAppsBody">
        <div id="icon" class="calculatorApps ${numApps}" style="margin-left: 8px;">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calculator.png?raw=true">
            <p style="color:black">Calculator</p>
        </div>
        <div id="icon" class="txtEditorApps ${numApps}" style="margin-left: 8px;">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true">
            <p style="color:black">Text Editor</p>
        </div>
        <div id="icon" class="calendarApps ${numApps}" style="margin-left: 8px;">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true">
            <p style="color:black">Calendar</p>
        </div>
        <div id="icon" class="emailApps ${numApps}" style="margin-left: -7px;">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true">
            <p style="color:black">Outlook Express</p>
        </div>
        <div id="icon" class="msdosApps ${numApps}" style="margin-left: -2px;">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/msdos.png?raw=true">
            <p style="color:black">MS-DOS Prompt</p>
        </div>
    </div>`
    openWindow(content,"myApps","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/appsdir.png?raw=true\">&nbsp&nbspMy Apps",[100,400],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/appsdir.png?raw=true","My Apps","myApps")
    arangeIcons(true)
}

async function myDocuments(){
    let numApps = await getNumberOfIcons("jonpngDocs")
    let content = `<div id="myDocumentsBody">
        <div id="icon" class="jonpngDocs ${numApps}">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/image.png?raw=true" style="width: 47.99px">
            <p style="color:black">jon.png</p>
        </div>
        <div id="icon" class="creditsDocs ${numApps}">
          <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/txt.png?raw=true">
          <p style="color:black">credits.txt</p>
        </div>
        <div id="icon" class="resumeDocs ${numApps}">
          <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/credits.png?raw=true">
          <p style="color:black">resume.pdf</p>
        </div>
    </div>`
    openWindow(content,"myDocuments","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/documents.png?raw=true\">&nbsp&nbspMy Documents",[100,300],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/documents.png?raw=true","My Documents","myDocuments")
    arangeIcons(true)
}

async function resume(){
    let content = `
        <iframe id="iframepdf" src="https://nbviewer.org/github/JonZavialov/portfolio2/blob/main/assets/textFiles/jonzav.pdf#toolbar=0"></iframe>    
    `
    openWindow(content,"resume","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/credits.png?raw=true\">&nbsp&nbspresume.pdf",[250,10],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/credits.png?raw=true","Document Viewer","resume")
}

async function myComputer(){
    let numApps = await getNumberOfIcons("driveFloppy")
    let content = `<div id="myComputerBody">
        <div id="icon" class="driveC ${numApps}">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/drive.png?raw=true">
            <p style="color: black">Storage (C:)</p>
        </div>
        <div id="icon" class="driveFloppy ${numApps}">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/driveFloppy.png?raw=true">
            <p style="color: black">3.5 Floppy (A:)</p>
        </div>
    </div>`
    openWindow(content,"myComputer","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/computer.png?raw=true\">&nbsp&nbspMy Computer",[100,200],true)
    addIconProperties()
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/computer.png?raw=true","My Computer","myComputer")
    arangeIcons(true)
}

async function jonpng(){
    let content = "<img style=\"width: 200px\" src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/jon.png?raw=true\">"
    openWindow(content,"jonpng","jon.png",[100,100],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/image.png?raw=true","Image Viewer","jonpng")
}

async function recycleBin(){
    let content = `<div id=\"recyclebinBody\">
        ${await getRecycleBinFormatted()}
    </div>`
    openWindow(content,"recycleBin","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/recycle.png?raw=true\">&nbsp&nbspRecycle Bin",[200,100],true)
    addIconProperties()
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

async function openCalculator() {
    //check if any calculators are already open
    var windows = document.querySelectorAll( `[id^=calculator` )
    if(windows.length != 0){ 
        throwError("You already have a calculator open!") 
        return
    }
    
    let content =`
        <div id="calculatorDisplay">0</div>
        <div id="calculatorButtons">
            <div id="calcButtonRowTop">
                <p id="calcBlankButton"></p>
                <button id="clearButton" onclick='pressButton(\`clear\`)'>C</button>
            </div>
            <div id="calcButtonRow" style='margin-top:10px'>
                <button style='margin-left: 0' onclick='pressButton(\`num\`,7)'>7</button>
                <button onclick='pressButton(\`num\`,8)'>8</button>
                <button onclick='pressButton(\`num\`,9)'>9</button>
                <button style='color:red' onclick='pressButton(\`operator\`,\`div\`)'>/</button>
            </div>
            <div id="calcButtonRow">
                <button style='margin-left: 0' onclick='pressButton(\`num\`,4)'>4</button>
                <button onclick='pressButton(\`num\`,5)'>5</button>
                <button onclick='pressButton(\`num\`,6)'>6</button>
                <button style='color:red' onclick='pressButton(\`operator\`,\`mult\`)'>*</button>
            </div>
            <div id="calcButtonRow">
                <button style='margin-left: 0' onclick='pressButton(\`num\`,1)'>1</button>
                <button onclick='pressButton(\`num\`,2)'>2</button>
                <button onclick='pressButton(\`num\`,3)'>3</button>
                <button style='color:red' onclick='pressButton(\`operator\`,\`sub\`)'>–</button>
            </div>
            <div id="calcButtonRow">
                <button style='margin-left: 0' onclick='pressButton(\`num\`,0)'>0</button>
                <button style='color:red; transform:translate(104px)' onclick='pressButton(\`operator\`,\`add\`)'>+</button>
            </div>
            <button id="equalsButton" style='color:red; margin-top:5px; margin-bottom:3px' onclick='pressButton(\`eval\`)'>=</button>
        </div>
    `
    openWindow(content,"calculator","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calculator.png?raw=true\">&nbsp&nbspCalculator",[100,100],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calculator.png?raw=true","Calculator","calculator")
}

async function openIntroWindow(){
    let content = `
    <p style="font-size: 16px;">    
        I am a Full Stack Developer with a passion for Computer Science. 
        I began learning how to code at a young age, when I was in 9th grade.
        Since then I've learned a variety of skills within anything that
        interests me including Python, Javascript, Java, TypeScript, ReactJS,
        Flask, and more recently creating websites such as this one. I code almost
        every day, jumping from project to project so I can learn something new 
        every day. In my free time I enjoy playing games such as Valorant with 
        my friends. My interests also include cryptography, cryptocurrency,
        calculus, and personal finance.
    </p>
    `
    openWindow(content,"aboutme","Welcome to my website",[200,200],false,`okButton`)
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

async function openWindow(content,name,title,coords,taskbar = false, footer = "", closeFunc = false, error = false){
    let numOfWindows = document.getElementsByClassName(`${name}Window`).length
    let taskbarName = ""
    if(taskbar) taskbarName = `,'${name}'`
    if(!closeFunc) closeFunc = `closeClassWindow('${name}${numOfWindows}'${taskbarName})`
    footer = footer.replace("okButton",`<button onclick=\"${closeFunc}\">OK</button>`)
    if(error) content += "<br><br>"

    let html = `
    <div id="${name}header" class="title-bar ${name}${numOfWindows}header">
        <div class="title-bar-text">
        ${title}
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="${closeFunc}" aria-label="Close"></button>
        </div>
    </div>
    <div class="window-body">
        ${content}
        <section class="field-row" style="justify-content: flex-end">
        ${footer}
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

async function throwError(content,additionalButtons = ""){
    openWindow(content,"errorWindow","Error",[200,200],false,`${additionalButtons}okButton`,false, true)
}

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

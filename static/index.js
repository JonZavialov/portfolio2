//Jonathan Zavialov

async function boot(){
    let bootList = [
        "Checking existing disk format.<br>",
        "QuickFormatting 10,75.03M<br>",
        "Recording current bad clusters<br>",
        "Complete.<br>",
        "Format complete<br>",
        "Writing out file allocation table<br>",
        "Complete.<br>",
        "Calculating free space (this may take several minutes)...<br>",
        "Complete.<br>",
        "<br>",
        "Volume label (11 characters, ENTER for none)? win98<br>",
        "<br>",
        "&nbsp&nbsp76,274.38 MB total disk space<br>",
        "&nbsp&nbsp76,274.38 MB available on disk<br>",
        "<br>",
        "&nbsp&nbsp&nbsp&nbsp32,768 bytes in each allocation unit.<br>",
        "&nbsp&nbsp2,440,779 allocation units available on disk.<br>",
        "<br>",
        "Volume Serial Number is 215C-1B16"
    ]
    
    let bootScreen = await document.getElementById("bootScreen")
    await sleep(10)
    bootScreen.innerHTML += `
    <div id="indented">
        <p>
            CD-ROM Device Driver for IDE (Four Channels Supported)<br>
            (C)Copyright Oak Technology Inc. 1993-1996<br>
            Driver Version&nbsp&nbsp&nbsp&nbsp: V340<br>
            Device Name&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: JONATHAN<br>
            Transfer Mode&nbsp&nbsp&nbsp&nbsp&nbsp: Programmed I/O<br>
            Drive 0: Port= 1f0  (Primary Channel), Slave IRQ= 14<br>
            Firmware version&nbsp&nbsp: ALPH
        </p>
    </div>
    `
    await sleep(1000)
    bootScreen.innerHTML += `
    <div id="unindented">
        <p>
            MSCDEX Version 2.25<br>
            Copyright (C) Microsoft Corp. 1986-1995. All rights reserved.<br>
                Drive R: = Driver JONATHAN unit 0<br>
            A:/>
        </p>
    </div>
    `
    await sleep(2000)
    bootScreen.innerHTML = ""
    var i = 0
    function myLoop(){                             
        setTimeout(async function() {
            bootScreen.innerHTML +=  bootList[i]
            i++
            if (i < bootList.length) {
                myLoop()
            }
            if(i == bootList.length){
                await sleep(1000)
                window.location.replace("/home")
            } 
        }, 125)
    }

    myLoop()
}

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

async function load(){
    if(!detectMob()){
        loadDesktopNav()
    }else{
        transformToMobile()
    }
}

async function transformToMobile(){
    var doc = document.getElementById("body")
    doc.style.backgroundColor = "black"
    doc.innerHTML= `
    <div id=\"error\">
        <div id = "errorWindow" class="window" style="margin: 32px; width: 250px">
        <div class="title-bar">
        <div class="title-bar-text">
            Jonathan Zavialov
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button onclick="closeWindow('errorWindow')" aria-label="Close"></button>
        </div>
        </div>
        <div class="window-body">
        <p>This website is only available on desktop.</p>
        <section class="field-row" style="justify-content: flex-end">
            <button onclick="closeWindow('error')">OK</button>
        </section>
        </div>
        </div>
    </div>
    `
}

async function loadDesktopNav(){
    let navBarDesktop = `
        <ul class=\"tree-view\">
            <li><a href=\"/home\">Home</a></li>
            <li><a href=\"https://github.com/JonZavialov/portfolio2\" target=\"_blank\">Repository</a></li>
        </ul>
    ` 
    let navBar = await document.getElementById("sidenav")
    navBar.innerHTML += navBarDesktop
}

async function closeWindow(windowID){
    console.log(`closing ${windowID}`)
    document.getElementById(windowID).remove()
}

async function border(name){
    let icon = document.getElementsByClassName(name)[0]
    if(icon.style.borderColor == "transparent" || icon.style.borderColor == ""){
        removeBorders()
        icon.style.borderColor = "white"
    }else{
        icon.style.borderColor = "transparent"
    }
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
            let date = new Date().toLocaleTimeString()
            dateDisplay.innerHTML = date
            i++
            dateLoop()
        }, 1000)
    }
    dateLoop()
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ]
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
    })
}

async function sleep(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(async function() {
            resolve()
        },ms)
    })
}
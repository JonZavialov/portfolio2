//methods for the initial boot function of the website

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
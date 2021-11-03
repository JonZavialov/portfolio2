//methods necesary to load the page

async function checkForMobile(){
    if(detectMob()){
        crash()
        return
    }

    var doc = document.getElementsByTagName("body")[0]
}

async function crash(){
    var doc = document.getElementsByTagName("body")[0]
    doc.id = "bsodBody"
    doc.innerHTML = `
    <p id="bsodHeader">
    System Error
    </p>
    <p id="bsodCentered">
    A fatal exception 0E76534801 has occured at 0027:C87123 
    in VXD VMM. Operating system has been stopped to prevent
    damage to your computer.
    </p>
    <p id="bsodBottom">
    * This website is only available on desktop computers.<br><br>
    * Sorry!
    </p>
    <p id="bsodFooter">
    Press any key to continue
    </p>
    `
    let footer = document.getElementById("bsodFooter")
    var i = 0
    function myLoop(){                             
        setTimeout(async function() {
            i++
            if(i%2==0){
                footer.innerHTML = footer.innerHTML.slice(0, -6) + '_'
            }else{
                footer.innerHTML = footer.innerHTML.slice(0, -1) + "&nbsp"
            }
            myLoop()
        }, 300)
    }

    myLoop()
}
async function render(){
    if(!detectMob()){
        loadDesktopNav()
    }else{
        transformToMobile()
    }
}

async function transformToMobile(){
    var doc = document.getElementById("body")
    doc.id = "bsodBody"
    doc.innerHTML= `
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
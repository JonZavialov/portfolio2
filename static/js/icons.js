async function arangeIcons(containersOnly = false){
    let arrangement = {
        "desktop": {
            "recycle" : [10,20],
            "computer" : [2, 120],
            "docs" : [0, 220],
            "apps" : [10, 320],
            "calculator" : [7, 420],
            "nft" : [94, 20],
            "txtEditor" : [87, 120],
            "jonpng" : [94, 220],
            "credits" : [90, 320],
            "resume" : [95, 420],
            "calendar" : [170, 20],
        },
        "myComputer" : {
            "driveC" : [0, 0],
            "driveFloppy" : [100, 0]
        },
        "myDocuments" : {
            "jonpngDocs" : [0, 0],
            "creditsDocs" : [80, 0],
            "resumeDocs" : [160, 0]
        },
        "myApps" : {
            "calculatorApps" : [0, 0],
            "txtEditorApps" : [80, 0],
            "calendarApps" : [160, 0]
        }
    }

    let containers = Object.keys(arrangement)
    for(let i = 0; i < containers.length; i++){
        let icons = Object.keys(arrangement[containers[i]])
        if(containers[i] == "desktop" && containersOnly) continue
        for(let j = 0; j < icons.length; j++){
            let icon = document.getElementsByClassName(icons[j])
            for(let k = 0; k < icon.length; k++){
                let offsetLeft = 28
                let offsetTop = 43
                if(containers[i] == "desktop"){
                    dragElement(icon[k],0,true)
                    offsetLeft = 40
                    offsetTop = 100
                }
                icon[k].style.left = arrangement[containers[i]][icons[j]][0] + offsetLeft + 'px'
                icon[k].style.top = arrangement[containers[i]][icons[j]][1] + offsetTop + 'px'
            }
        }
    }
}

async function addIconProperties(){
    var icons = document.querySelectorAll( '#icon, #recycledIcon' )    
    for( i=0; i<icons.length; i++ ) {
        icons[i].setAttribute( "onclick", `border(\"${icons[i].className}\")` )
    }

    document.addEventListener("click", function(event) {
        if (event.target.closest("#icon") || event.target.closest("#recycledIcon")) return
        removeBorders()
    })
}

async function recycleHover(icon){
    if(icon.style.opacity == 0.5) return
    objectsThatAreColliding.push(icon)
    console.log('recycling')
    icon.style.opacity = 0.5
    border('recycle')
    icon.setAttribute("onmouseup", `iconReleased('${icon.className}')`)
}

async function iconReleased(iconName){
    let icon = document.getElementsByClassName(iconName)[0]
    let collide = doElsCollide(masterIconsList[1],icon)
    if(collide){
        recycle(icon)
    }
}

async function recycle(icon){
    icon.remove()
    masterIconsList = await document.querySelectorAll( '[id^=icon]' )
    recycledIcons.push(icon)
    refreshRecycleBin()
}

async function checkIfIconsAreStillColliding(){
    for( i=0; i<objectsThatAreColliding.length; i++ ) {
        let collide = doElsCollide(masterIconsList[1],objectsThatAreColliding[i])
        if(!collide){
            objectsThatAreColliding[i].style.opacity = 1
            document.getElementsByClassName('recycle')[0].style.borderColor = "transparent"
            objectsThatAreColliding.splice(i,1)
        }
    }
}

async function checkIfIconIsOnRecycler(){
    for( i=0; i<masterIconsList.length; i++ ) {
        if(masterIconsList[i].className != "recycle"){
            let collide = doElsCollide(masterIconsList[1],masterIconsList[i])
            if(collide) recycleHover(masterIconsList[i])
        }
    }
}

async function initIcons(){
    masterIconsList = await document.querySelectorAll( '[id^=icon]' )
    objectsThatAreColliding = []
    recycledIcons = []
    function myLoop(){                             
        setTimeout(async function() {
            checkIfIconIsOnRecycler()
            checkIfIconsAreStillColliding()
            myLoop()
        }, 62)
    }
    myLoop()
}

async function getRecycleBinFormatted(numApps = null){
    let html = `<div id="recycleRow">`
    let lineBreak, endDiv
    for( i=0; i<recycledIcons.length; i++ ) {
        lineBreak = ""
        endDiv = ""
        if(i % 5 == 0 && i != 0)lineBreak = `<div id="recycleRow">`
        else if(i % 4 == 0 && i != 0)endDiv = `</div>`
        if(numApps == null){
            numApps = await getNumberOfIcons(recycledIcons[i].className + "Recycled")
        }
        html += `${lineBreak}<div id="recycledIcon" class="${recycledIcons[i].className}Recycled${numApps} ${recycledIcons[i].className}Recycled">
            ${recycledIcons[i].innerHTML}
        </div>${endDiv}`
    }
    return html
}

async function getNumberOfIcons(name){
    let icons = document.getElementsByClassName(name)
    return icons.length
}

async function removeBorders(){
    var icons = document.querySelectorAll( '#icon, #recycledIcon' )
    for(let i=0; i<icons.length; i++ ) {
        icons[i].style.borderColor = "transparent"
    }
}

async function refreshRecycleBin(){
    let recycleBins = document.querySelectorAll(`#recyclebinBody`)
    let numApps = await getNumberOfIcons(recycledIcons[0].className  + "Recycled")
    for(let i=0; i<recycleBins.length; i++ ) {
        recycleBins[i].innerHTML = await getRecycleBinFormatted(numApps)
        console.log(`refreshing recycle bins`)
        numApps += 1
    }
    addIconProperties()
}
async function arangeIcons(draggable = false){
    let arrangement = {
        "desktop": {
            "recycle" : [10,20],
            "computer" : [2, 120],
            "docs" : [0, 220],
            "apps" : [10, 320],
            "calculator" : [7, 420],
            "nft" : [94, 20],
            "txtEditor" : [90, 120],
            "jonpng" : [94, 220],
            "credits" : [90, 320],
            "resume" : [95, 420],
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
            "txtEditorApps" : [80, 0]
        }
    }

    let containers = Object.keys(arrangement)
    for(let i = 0; i < containers.length; i++){
        let icons = Object.keys(arrangement[containers[i]])
        for(let j = 0; j < icons.length; j++){
            let icon = document.getElementsByClassName(icons[j])
            for(let k = 0; k < icon.length; k++){
                icon[k].style.transform = `translate(${arrangement[containers[i]][icons[j]][0]}px, ${arrangement[containers[i]][icons[j]][1]}px)`
                if(draggable) dragElement(icon[k],0,true)
            }
        }
    }
}
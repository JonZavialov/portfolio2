async function initMsdos(){
    let numApps = await document.getElementsByClassName("msdosWindow").length
    
    content = `
        <p style="padding-top: 30px">
            Microsoft(R) Windows 98 <br>
            &nbsp&nbsp&nbsp(C)Copyright Microsoft Corp 1981-1999.
        </p>
        <br>
        <div id="workAreaInitial" class="workAreaInitial${numApps}">
            <p>C:\\></p><textarea class="msdosInitialInput${numApps} iabsfiasgfui" maxlength="62" oninput="processMsdosInputInitial('${numApps}')"></textarea>
        </div>
        <div class="workArea${numApps}"></div>
    `
    openWindow(content,"msdos","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/msdos.png?raw=true\">&nbsp&nbspMS-DOS Prompt",[20,150],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/msdos.png?raw=true","MS-DOS Prompt","msdos")
    document.getElementsByClassName(`msdosInitialInput${numApps}`)[0].focus()
}

async function processMsdosInputInitial(numApps){
    let initialInput = document.getElementsByClassName(`msdosInitialInput${numApps}`)[0]
    if(initialInput.value.length == 62){
        createNewLine(numApps)
    }
    checkForEnter(initialInput, numApps)
}

async function processMsdosInput(numApps, initial=false){
    let workArea = document.getElementsByClassName(`workArea${numApps}`)[0]
    let textAreas = workArea.getElementsByClassName(`textAreaMsdos${numApps}`)

    if(textAreas.length == 0){
        textAreas = document.getElementsByClassName(`textAreaMsdos${numApps}`)
    }

    for(let i = 0; i < textAreas.length; i++){
        checkForEnter(textAreas[i], numApps)
    }

    let textAreasLength = textAreas.length
    let lastTextArea = textAreas[textAreasLength-1]
    if(!lastTextArea) return
    if(lastTextArea.value.length == 66 || (initial && lastTextArea.value.length == 62)){
        createNewLine(numApps)
    }
    else if(lastTextArea.value.length == 0){
        try{workArea.removeChild(lastTextArea)}
        catch(err){}
        if(await workArea.getElementsByClassName(`textAreaMsdos${numApps}`).length == 0){
            if(document.getElementsByClassName(`msdosInitialInput${numApps}`)[0]) document.getElementsByClassName(`msdosInitialInput${numApps}`)[0].focus()
            else{
                let input = await document.getElementsByClassName(`textAreaMsdos${numApps}`)[0]
                input.focus()
            }
        }else textAreas[textAreasLength-2].focus() 
    }
}

async function createNewLine(numApps){
    let workArea = document.getElementsByClassName(`workArea${numApps}`)[0]
    let newLine = document.createElement("textarea")
    newLine.className = `textAreaMsdos${numApps}`
    newLine.maxLength = 66
    newLine.oninput = function(){processMsdosInput(numApps)}
    workArea.appendChild(newLine)
    newLine.focus()
}

async function checkForEnter(element, numApps){
    if(element.value.includes("\n") && element.readOnly == false){
        element.value = element.value.replace("\n","")
        element.blur()
        
        let textAreas = element.parentElement.getElementsByClassName(`textAreaMsdos${numApps}`)
        
        let commandString
        if(document.getElementsByClassName(`msdosInitialInput${numApps}`)[0] && !document.getElementsByClassName(`msdosInitialInput${numApps}`)[0].readOnly) commandString = document.getElementsByClassName(`msdosInitialInput${numApps}`)[0].value
        else commandString = ""
        for(let i = 0; i < textAreas.length; i++){
            commandString += textAreas[i].value
        }
        executeCommand(commandString, numApps)
    }
}

async function executeCommand(commandString, numApps){
    let msdosScreen = document.getElementsByClassName(`msdos${numApps}`)[0]
    let textAreas = msdosScreen.getElementsByTagName("textarea")
    for(let i = 0; i < textAreas.length; i++){
        textAreas[i].readOnly = true
    }
    
    let workArea = document.getElementsByClassName(`workArea${numApps}`)[0]
    let command = commandString.split(" ")[0]
    let args = commandString.split(" ").slice(1)
    let commandOutput = ""

    commands = {
        "cls": {
            "function": `clearScreen(${numApps})`,
            "description": "Clears the CMD window"
        },
        "help": {
            "function": `help(commands)`,
            "description": "Displays a list of available commands"
        },
        "exit": {
            "function": `closeClassWindow('msdos${numApps}', "msdos")`,
            "description": "Closes the CMD window"
        }
    }

    let commandNames = Object.keys(commands)
    for(let i = 0; i < commandNames.length; i++){
        if(commandNames[i] == command){
            commandOutput = await eval(commands[commandNames[i]].function)
            break
        }
    }

    if(commandOutput == ""){
        commandOutput = "Command not found"
    }

    let newLine = document.createElement("textarea")
    newLine.className = `textAreaMsdos${numApps}`
    newLine.value = commandOutput
    newLine.readOnly = true

    if(newLine.value.split("\n").length - 1 != 0){
        newLine.style.height = `${15 * (newLine.value.split("\n").length - 1)}px`
    }

    workArea.appendChild(newLine)
    let elems = await generateNewInput(numApps)
    workArea.appendChild(elems[0])
    workArea.appendChild(elems[1])

    let input = await document.getElementsByClassName(`textAreaMsdos${numApps}`)
    if(input.length != 0) input[input.length-1].focus()
}

async function clearScreen(numApps){
    let area = document.getElementsByClassName(`msdos${numApps}`)[0].getElementsByClassName(`window-body`)[0]
    area.innerHTML = ""
    
    let elems = await generateNewInput(numApps)
    area.appendChild(elems[0])
    area.appendChild(elems[1])

    let input = await document.getElementsByClassName(`textAreaMsdos${numApps}`)[0]
    input.focus()
}

async function help(){
    let commandNames = Object.keys(commands)
    let commandOutput = ""
    for(let i = 0; i < commandNames.length; i++){
        commandOutput += `${commandNames[i]} - ${commands[commandNames[i]].description}\n`
    }
    return commandOutput
}

async function generateNewInput(numApps){
    let initialWorkArea = document.createElement("div")
    initialWorkArea.id = "workAreaInitial"
    initialWorkArea.className = `workAreaInitial${numApps}`

    let para = document.createElement("p")
    para.innerHTML = "C:\\>"
    initialWorkArea.appendChild(para)

    let input = document.createElement("textarea")
    input.className = `textAreaMsdos${numApps}`
    input.maxLength = 62
    input.oninput = function(){processMsdosInput(numApps, true)}
    initialWorkArea.appendChild(input)

    let workArea = document.createElement("div")
    workArea.className = `workArea${numApps}`

    return [initialWorkArea, workArea]
}
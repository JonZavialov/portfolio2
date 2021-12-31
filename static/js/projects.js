async function initProjects(){
    let numApps = await getNumberOfIcons("projectsWindow")

    let content = `
        <div id="projectsWindowContainer">
            <div id="projectWindow1" class="projectWindow1${numApps}"></div>
            <div id="projectWindow2" class="projectWindow2${numApps}"></div>
        </div>
        <div id="projectsWindowContainer">
            <div id="projectWindow3" class="projectWindow3${numApps}"></div>
            <div id="projectWindow4" class="projectWindow4${numApps}"></div>
        </div>
        <img src="https://ghchart.rshah.org/jonzavialov" style="width: 500px">
    `

    openWindow(content,"projects","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/myprojects.png?raw=true\">&nbsp&nbspMy Projects",[50,50],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/myprojects.png?raw=true","My Projects","projects")
    setProjectWindows(numApps)
}

async function setProjectWindows(numApps){
    let projectWindows = [
        document.getElementsByClassName("projectWindow1"+numApps)[0],
        document.getElementsByClassName("projectWindow2"+numApps)[0],
        document.getElementsByClassName("projectWindow3"+numApps)[0],
        document.getElementsByClassName("projectWindow4"+numApps)[0]
    ]
    let topProjects = await getTopProjects()
    console.log(topProjects)
    for(let i = 0; i < projectWindows.length; i++){
        projectWindows[i].innerHTML = `
            <div style="display: flex">
                <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/projectsicon3.png?raw=true">
                <div class="projectTitle" onclick="window.open('${topProjects[i].html_url}', '_blank')"><p style="font-weight: bold">${topProjects[i].full_name}</p></div>
            </div>
            <br>
            <p>${topProjects[i].description}</p>
            <br>
            <p style="color: #818181">${topProjects[i].language}</p>
        `
    }
}

async function getTopProjects(){
    let starred = await fetch("https://api.github.com/users/JonZavialov/starred")
    let starredJSON = await starred.json()
    let topProjects = []
    for(let i = 0; i < 4; i++){
        topProjects.push(starredJSON[i])
    }
    return topProjects
}
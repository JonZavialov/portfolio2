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
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/projecticon.png?raw=true"><p>${topProjects[i].full_name}</p>
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

    for(let i = 0; i < topProjects.length; i++){
        let commits = await fetch(topProjects[i].commits_url.substring(0,topProjects[i].commits_url.length - 6))
        let commitsJSON = await commits.json()
        topProjects[i].commits = commitsJSON.length
    }

    return topProjects
}
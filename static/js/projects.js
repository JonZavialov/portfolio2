async function initProjects(){
    let numApps = await getNumberOfIcons("projectsWindow")

    let content = `
        projects
    `

    openWindow(content,"projects","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/myprojects.png?raw=true\">&nbsp&nbspMy Projects",[50,50],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/myprojects.png?raw=true","My Projects","projects")
}
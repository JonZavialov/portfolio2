async function initSnakeGame(){
    let numApps = await getNumberOfIcons("snakeWindow")

    let content = "souse"

    openWindow(content,"snake","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/snake.png?raw=true\">&nbsp&nbspSnake",[100,100],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/snake.png?raw=true","Snake","snake")
}
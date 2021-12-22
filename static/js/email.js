async function initEmail(documentId = null){
    let content = `
        <div id="emailBody">
            email
        </div>
    `
    openWindow(content,"email","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true\">&nbsp&nbspOutlook Express",[300,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true","Outlook Express","email")
}
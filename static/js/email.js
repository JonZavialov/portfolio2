async function initEmail(documentId = null){
    let content = `
        <div id="emailBody">
            <div id="buttonsHeader">
                <div id="outlookHeaderButton">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/compose.png?raw=true">
                    <p>Compose Message</p>
                </div>
                <hr id="outlookHr1">
                <div id="outlookHeaderButton">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/mailbox.png?raw=true">
                    <p>Send And Receive</p>
                </div>
            </div>
        </div>
    `
    openWindow(content,"email","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true\">&nbsp&nbspOutlook Express",[300,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true","Outlook Express","email")
}
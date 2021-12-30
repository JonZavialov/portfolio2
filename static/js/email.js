async function initEmail(documentId = null){
    let content = `
        <div id="emailBody">
            <div id="buttonsHeader">
                <div id="outlookHeaderButton">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/compose.png?raw=true">
                    <p>Compose Message</p>
                </div>
                <hr id="outlookHr1">
                <div id="outlookHeaderButton" style="margin-left: 10px">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/mailbox.png?raw=true">
                    <p>Send And Receive</p>
                </div>
                <hr id="outlookHr2">
                <div id="outlookHeaderButton" style="margin-left: 10px">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/address.png?raw=true">
                    <p>Address Book</p>
                </div>
                <hr id="outlookHr3">
                <div id="outlookHeaderButton" style="margin-left: 10px; transform:translate(0px, -8px)">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/connect.png?raw=true">
                    <p>Connect</p>
                </div>
                <div id="outlookHeaderButton" style="margin-right: 100px; transform:translate(0px, -8px)">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/hangup.png?raw=true">
                    <p>Hang Up</p>
                </div>
                <hr id="outlookHr4">
                <div id="outlookHeaderLogo">
                    <img src="https://raw.githubusercontent.com/JonZavialov/explorersvg/main/iesvg.svg">
                </div>
            </div>

            <div style="display: flex">
                <ul class="tree-view" id="inboxTree">
                    <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/inboxicon.png?raw=true">
                    Outlook Express
                    <ul>
                        <li>
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/inbox.png?raw=true">
                            Inbox
                        </li>
                        <li>
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outbox.png?raw=true">
                            Outbox
                        </li>
                        <li>
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/sentitems.png?raw=true">
                            Sent Items
                        </li>
                        <li>
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/deletedmail.png?raw=true">
                            Deleted Items
                        </li>
                        <li>
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/drafts.png?raw=true">
                            Drafts
                        </li>
                    </ul>
                </ul>

                <div id="emailDisplay">
                </div>
            </div>
        </div>
    `
    openWindow(content,"email","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true\">&nbsp&nbspOutlook Express",[50,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true","Outlook Express","email")
}
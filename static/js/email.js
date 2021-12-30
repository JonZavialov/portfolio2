async function initEmail(width = 50, height = 150){
    let numApps = await getNumberOfIcons("emailWindow")
    
    content = `
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
                        <li id="inboxTreeElem" onclick="clickInboxTreeItem(${numApps})" class="inboxTree${numApps}", style="width: fit-content">
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/inbox.png?raw=true">
                            Inbox
                        </li>
                        <li id="inboxTreeElem">
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outbox.png?raw=true">
                            Outbox
                        </li>
                        <li id="inboxTreeElem">
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/sentitems.png?raw=true">
                            Sent Items
                        </li>
                        <li id="inboxTreeElem">
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/deletedmail.png?raw=true">
                            Deleted Items
                        </li>
                        <li id="inboxTreeElem">
                            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/drafts.png?raw=true">
                            Drafts
                        </li>
                    </ul>
                </ul>

                <div id="emailDisplay" class="emailDisplay${numApps}">
                </div>
            </div>
        </div>
    `
    openWindow(content,"email","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true\">&nbsp&nbspOutlook Express",[width,height],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/outlook.png?raw=true","Outlook Express","email")
    displayDefaultEmail(numApps)
}

async function clickInboxTreeItem(numApps){
    let element = document.getElementsByClassName(`inboxTree${numApps}`)[0]

    if(element.style.borderColor == "" || element.style.borderColor == "rgb(231, 231, 231)"){
        //inbox list is showing
        element.style.borderColor = "rgb(0, 0, 0)"
        insertInboxTree(element)
        displayIntroEmail(numApps)
    }else{
        //inbox list is not showing
        element.style.borderColor = "rgb(231, 231, 231)"
        removeInboxTree(element)
        displayDefaultEmail(numApps)
    }
}


async function insertInboxTree(element){
    let inboxTree = document.createElement("ul")
    inboxTree.innerHTML = `<li>intro@jonzav.me</li>`

    element.appendChild(inboxTree)
}

async function removeInboxTree(element){
    let inboxTree = element.getElementsByTagName("ul")[0]
    inboxTree.remove()
}

async function displayIntroEmail(numApps){
    let display = document.getElementsByClassName(`emailDisplay${numApps}`)[0]
    display.innerHTML = `
        <div style="display: flex;">
            <p style="font-weight:bold; margin: 0">From:</p><p style="margin:0; margin-left:55px">Jonathan D. Zavialov &#60;intro@jonzav.me&#62;</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight:bold; margin:0">Sent:</p><p style="margin: 0; margin-left:58px">Thursday, December 30, 2021 4:25 PM</p>
        </div>
        <div style="display: flex;">
            <p style="font-weight:bold; margin:0">Subject:</p><p style="margin: 0; margin-left:41px">Introduction</p>
        </div>

        <p style="margin:0; margin-top:25px; font-size:12px; margin-right:3px">
            &nbsp&nbsp&nbsp&nbspThis culmination of a couple of months of work serves as a hub for all of 
            my coding projects. It will continuously evolve along with my coding skill, as well as my 
            changing passions. This page is my form of creatively expressing my interests, and progress as 
            a full-stack developer in a medium that excites me.
        </p>
        <p style="margin:0; margin-top:4px; font-size:12px; margin-right:3px">
            &nbsp&nbsp&nbsp&nbspI am experienced in Python, Javascript, Java, Solidity, and many Javascript 
            frameworks. Currently my interests include cryptography, cryptocurrencies, trading stocks, and 
            NFTs. I also enjoy playing Valorant and Rust with my friends in my free time.
        </p>
        <p style="margin:0; margin-top:4px; font-size:12px; margin-right:3px">
            &nbsp&nbsp&nbsp&nbspI hope you find this website as fun as is had making it. Hopefully it will 
            provide you a glimpse into my life.
        </p>
        <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/signatureremoved.png?raw=true" style="width: 175px; padding-top: 9px; transform: translate(-10px);">
    `
}

async function displayDefaultEmail(numApps){
    let display = document.getElementsByClassName(`emailDisplay${numApps}`)[0]
    display.innerHTML = `
        <h4 style="font-weight:100">Microsoft</h4>
        <h4 style="margin-left: 40px">Outlook Express</h4>
        <p style="margin: 0; transform: translate(110px,-53px); font-size: 6px;">®</p>
        <p style="font-size: 12px">Welcome! <br>
        You have one new message. <br>
        Press Inbox to view it.</p>
    `
}
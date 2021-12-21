async function initCalendar(){
    let monthData = await getMonthDays(new Date().getFullYear(), new Date().getMonth())

    let numApps = await getNumberOfIcons("calendarWindow")
    let content = `
        <div id="calendarBody">
            <select id="monthSelector" class="monthSelector${numApps}">
                <option>January</option>
                <option>February</option>
                <option selected>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select>
            <button id="yearSelector" class="yearSelector${numApps}">2021</button>
            <button id="yearUpButton" onclick="yearUp(${numApps})">▲</button>
            <button id="yearDownButton" onclick="yearDown(${numApps})">▼</button>
            <div id="calendarDisplay" class="calendarDisplay${numApps}">
                ${await renderCalendar(monthData[0], monthData[1], numApps)}
            </div>
        </div>
    `

    openWindow(content,"calendar","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true\">&nbsp&nbspCalendar",[150,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true","Calendar","calendar")
    await sleep(10)
    addMonthChangeListener(numApps)
}

async function renderCalendar(firstDay, daysInMonth, numApps){
    let dates = ``
    for(let i = 0; i < firstDay; i++){
        dates += `<li>&nbsp</li>`
    }
    for(let i = 0; i < daysInMonth; i++){
        dates += `<li onclick="highlightDay(${numApps}, ${i+1})" class="dayTile${numApps}${i+1}">${i+1}</li>`
    }
    
    let content = `
        <ul id="weekdays">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
        </ul>
        <ul id="days">
            ${dates}
        </ul>
    `

    return content
}

async function highlightDay(numApps, day){
    let dayTile = document.getElementsByClassName(`dayTile${numApps}${day}`)[0]
    if(dayTile.style.backgroundColor != "rgb(221, 221, 221)") dayTile.style.backgroundColor = "rgb(221, 221, 221)"
    else dayTile.style.backgroundColor = "white"
}

async function addMonthChangeListener(numApps){
    let monthSelector = await document.getElementsByClassName(`monthSelector${numApps}`)[0]
    
    monthSelector.addEventListener('change', async(event) => {
        let year = document.getElementsByClassName(`yearSelector${numApps}`)[0].innerHTML
        year = parseInt(year)
        let month = event.target.value
        month = await convertMonthToNumber(month)
        processCalendarChange(numApps, year, month)
    })
}

async function getMonthDays(year, month){
    let firstDay = (new Date(year, month)).getDay()
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    return [firstDay, daysInMonth]
}

async function processCalendarChange(numOfWindow, year, month){
    let monthData = await getMonthDays(year, month)
    let calendarWindow = await document.getElementsByClassName(`calendarDisplay${numOfWindow}`)[0]
    calendarWindow.innerHTML = await renderCalendar(monthData[0], monthData[1], numOfWindow)
}

async function yearUp(numOfWindow){
    let calendarWindowYear = await document.getElementsByClassName(`yearSelector${numOfWindow}`)[0]
    let num = parseInt(calendarWindowYear.innerHTML) + 1
    calendarWindowYear.innerHTML = num

    let month = document.getElementsByClassName(`monthSelector${numOfWindow}`)[0].value
    month = await convertMonthToNumber(month)
    processCalendarChange(numOfWindow, num, month)
}

async function yearDown(numOfWindow){
    let calendarWindowYear = await document.getElementsByClassName(`yearSelector${numOfWindow}`)[0]
    let num = parseInt(calendarWindowYear.innerHTML) - 1
    calendarWindowYear.innerHTML = num

    let month = document.getElementsByClassName(`monthSelector${numOfWindow}`)[0].value
    month = await convertMonthToNumber(month)
    processCalendarChange(numOfWindow, num, month)
}

async function convertMonthToNumber(month){
    switch(month){
        case "January":
            return 0
        case "February":
            return 1
        case "March":
            return 2
        case "April":
            return 3
        case "May":
            return 4
        case "June":
            return 5
        case "July":
            return 6
        case "August":
            return 7
        case "September":
            return 8
        case "October":
            return 9
        case "November":
            return 10
        case "December":
            return 11
    }
}
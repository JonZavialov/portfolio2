async function initCalendar(){
    let weekDays = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }
    
    let monthData = await getMonthDays()
    let firstDay = monthData[0]
    let daysInMonth = monthData[1]

    let numApps = await getNumberOfIcons("calendarWindow")
    let content = `
        <div id="calendarBody">
            <select>
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
        </div>
    `
    openWindow(content,"calendar","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true\">&nbsp&nbspCalendar",[150,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true","Calendar","calendar")
}

async function getMonthDays(year, month){
    let firstDay = (new Date(year, month)).getDay()
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    return [firstDay, daysInMonth]
}

async function yearUp(numOfWindow){
    console.log(numOfWindow)
    let calendarWindowYear = await document.getElementsByClassName(`yearSelector${numOfWindow}`)[0]
    calendarWindowYear.innerHTML = parseInt(calendarWindowYear.innerHTML) + 1
}

async function yearDown(numOfWindow){
    let calendarWindowYear = await document.getElementsByClassName(`yearSelector${numOfWindow}`)[0]
    calendarWindowYear.innerHTML = parseInt(calendarWindowYear.innerHTML) - 1
}
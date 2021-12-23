async function initCalendar(){
    let numApps = await getNumberOfIcons("calendarWindow")

    let content = `
        <button onclick="setCalendarBorders(${numApps}, -1)" style="outline: none">Date</button>
        <button onclick="setCalendarBorders(${numApps}, 1)" style="outline: none">Time</button>
        <div id="borderCover" class="borderCover${numApps}"></div>
        <div id="borderCoverVertical" class="borderCoverVertical${numApps}"></div>
        <div id="borderCoverVertical2" class="borderCoverVertical2${numApps}"></div>
        <div id="calendarBody" class="calendarBody${numApps}"></div>
    `

    openWindow(content,"calendar","<img width=13px src=\"https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true\">&nbsp&nbspCalendar",[150,250],true)
    taskbarUpdate("https://github.com/JonZavialov/portfolio2/blob/main/assets/images/calendar.png?raw=true","Calendar","calendar")
    setCalendarToDate(numApps)
    await sleep(10)
    addMonthChangeListener(numApps)
}

async function setCalendarToTime(numApps){
    let content = `
        <div id="clockDisplay">
            <article class="clock clock${numApps}">
                <div class="hours-container hours-container${numApps}">
                    <div class="hours hours${numApps}"></div>
                </div>
                <div class="minutes-container minutes-container${numApps}">
                    <div class="minutes minutes${numApps}"></div>
                </div>
                <div class="seconds-container seconds-container${numApps}">
                    <div class="seconds seconds${numApps}"></div>
                </div>
            </article>
        </div>
    `

    document.getElementsByClassName(`calendarBody${numApps}`)[0].innerHTML = content

    initLocalClocks(numApps)
    setUpMinuteHands(numApps)
    moveSecondHands(numApps)
}

async function setCalendarToDate(numApps){
    let d = new Date()
    let currentMonth = d.getMonth()
    let currentYear = d.getFullYear()
    let currentDay = d.getDate()
    let monthData = await getMonthDays(currentYear, currentMonth)

    let months = ""
    for(let i = 0; i < 12; i++){
        let selectedTag = ""
        if(i == currentMonth) selectedTag = "selected"
        months += `<option ${selectedTag}>${await convertNumberToMonth(i)}</option>`
    }

    let content = `
        <select id="monthSelector" class="monthSelector${numApps}">
            ${months}
        </select>
        <button id="yearSelector" class="yearSelector${numApps}">2021</button>
        <button id="yearUpButton" onclick="yearUp(${numApps})">▲</button>
        <button id="yearDownButton" onclick="yearDown(${numApps})">▼</button>
        <div id="calendarMainDisplay">
            <div id="calendarDisplay" class="calendarDisplay${numApps}">
                ${await renderCalendar(monthData[0], monthData[1], numApps, currentDay)}
            </div>
            <div id="dayDisplay" class="dayDisplay${numApps}">
                ${await renderDay(currentDay, currentMonth, currentYear)}
            </div>
        </div>
    `

    document.getElementsByClassName(`calendarBody${numApps}`)[0].innerHTML = content
}

async function setCalendarBorders(numApps, direction){
    let borderCovers = [document.getElementsByClassName(`borderCover${numApps}`)[0], document.getElementsByClassName(`borderCoverVertical${numApps}`)[0], document.getElementsByClassName(`borderCoverVertical2${numApps}`)[0]]
    for(let i = 0; i < borderCovers.length; i++){
        let transformX = parseInt(getComputedStyle(borderCovers[i]).getPropertyValue('transform').split(' ')[4].slice(0, -1))
        let transformY = parseInt(getComputedStyle(borderCovers[i]).getPropertyValue('transform').split(' ')[5].slice(0, -1))
        if(direction == -1 && transformX < 10) return
        if(direction == 1 && transformX > 50) return
        borderCovers[i].style.transform = `translate(${transformX + (77 * direction)}px, ${transformY}px)`
    }
    if(direction == -1) setCalendarToDate(numApps)
    else setCalendarToTime(numApps)
}

async function renderCalendar(firstDay, daysInMonth, numApps, today=-1){
    let dates = ``
    for(let i = 0; i < firstDay; i++){
        dates += `<li>&nbsp</li>`
    }
    for(let i = 0; i < daysInMonth; i++){
        if(i+1 == today){
            backgroundColor = "rgb(221, 221, 221)" 
        }
        else backgroundColor = ""
        dates += `<li style="background-color: ${backgroundColor};" onclick="highlightDay(${numApps}, ${i+1})" class="dayTile${numApps}${i+1} dayTile${numApps}">${i+1}</li>`
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

async function renderDay(day, month, year){
    let formattedMonth = await convertNumberToMonth(month)
    
    let nationalDays = await makeGetRequest(`https://national-api-day.herokuapp.com/api/date/${month + 1}/${day}`)
    nationalDays = nationalDays.holidays
    let formattedNationalDays = ""
    for(let i = 0; i < nationalDays.length; i++){
        formattedNationalDays += `<li>${nationalDays[i]}</li>`
    }

    let content = `
        <div id="dayHeader">
            <p>${formattedMonth} ${day}, ${year}</p>
        </div>
        <div id="dayBody">
            ${formattedNationalDays}
        </div>
    `
    
    return content
}

async function clearDayDisplay(numApps){
    let dayDisplay = await document.getElementsByClassName(`dayDisplay${numApps}`)[0]
    dayDisplay.innerHTML = ""
}

async function highlightDay(numApps, day){
    let dayTile = document.getElementsByClassName(`dayTile${numApps}${day}`)[0]
    if(dayTile.style.backgroundColor != "rgb(221, 221, 221)"){
        dayTile.style.backgroundColor = "rgb(221, 221, 221)"
        
        let dayDisplay = await document.getElementsByClassName(`dayDisplay${numApps}`)[0]
        let month = document.getElementsByClassName(`monthSelector${numApps}`)[0].value
        month = await convertMonthToNumber(month)
        let year = document.getElementsByClassName(`yearSelector${numApps}`)[0].innerHTML
        year = parseInt(year)
        dayDisplay.innerHTML = await renderDay(day, month, year)
        
        let dayTiles = document.getElementsByClassName(`dayTile${numApps}`)
        for(let i = 0; i < dayTiles.length; i++){
            if(dayTiles[i].style.backgroundColor == "rgb(221, 221, 221)" && dayTiles[i].innerHTML != day){
                dayTiles[i].style.backgroundColor = "white"
            }
        }
    }
    else{
        dayTile.style.backgroundColor = "white"
        clearDayDisplay(numApps)
    }
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
    clearDayDisplay(numOfWindow)
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

async function convertNumberToMonth(month){
    switch(month){
        case 0:
            return "January"
        case 1:
            return "February"
        case 2:
            return "March"
        case 3:
            return "April"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "October"
        case 10:
            return "November"
        case 11:
            return "December"
    }
}

function initLocalClocks(numApps) {
    // Get the local time using JS
    var date = new Date
    var seconds = date.getSeconds()
    var minutes = date.getMinutes()
    var hours = date.getHours()
  
    // Create an object with each hand and it's angle in degrees
    var hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (seconds * 6)
      }
    ]

    var elements = [
        document.getElementsByClassName(`hours${numApps}`)[0],
        document.getElementsByClassName(`minutes${numApps}`)[0],
        document.getElementsByClassName(`seconds${numApps}`)[0]
    ]

    // Loop through each of these hands to set their angle
    for (var j = 0; j < hands.length; j++) {
        if(j == 0 || j == 2){
            elements[j].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)'
            elements[j].style.transform = 'rotateZ('+ hands[j].angle +'deg)'
        }else{
            elements[j].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)'
            elements[j].style.transform = 'rotateZ('+ hands[j].angle +'deg)'
            elements[j].parentNode.setAttribute('data-second-angle', hands[j + 1].angle)
        }
    }
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
function setUpMinuteHands(numApps) {
    // Find out how far into the minute we are
    var container = document.getElementsByClassName(`minutes-container${numApps}`)[0]
    var secondAngle = container.getAttribute("data-second-angle")
    if (secondAngle > 0) {
      // Set a timeout until the end of the current minute, to move the hand
      var delay = (((360 - secondAngle) / 6) + 0.1) * 1000
      setTimeout(function() {
        moveMinuteHands(container, numApps)
      }, delay)
    }
}
  
/*
* Do the first minute's rotation
*/
function moveMinuteHands(container, numApps) {
    container.style.webkitTransform = 'rotateZ(6deg)'
    container.style.transform = 'rotateZ(6deg)'
    // Then continue with a 60 second interval
    let minutesInterval = setInterval(function() {
        if (container.angle === undefined) {
            container.angle = 12
        } else {
            container.angle += 6
        }
        if(!document.getElementsByClassName(`minutes-container${numApps}`)[0]) clearInterval(minutesInterval)
        container.style.webkitTransform = 'rotateZ('+ container.angle +'deg)'
        container.style.transform = 'rotateZ('+ container.angle +'deg)'
    }, 60000)
}

/*
 * Move the second containers
 */
function moveSecondHands(numApps) {
    let container = document.getElementsByClassName(`seconds-container${numApps}`)[0]
    let secondsInterval = setInterval(function() {
        if (container.angle === undefined) {
          container.angle = 6
        } else {
          container.angle += 6
        }
        if(!document.getElementsByClassName(`seconds-container${numApps}`)[0]) clearInterval(secondsInterval)
        container.style.webkitTransform = 'rotateZ('+ container.angle +'deg)'
        container.style.transform = 'rotateZ('+ container.angle +'deg)'
    }, 1000)
}
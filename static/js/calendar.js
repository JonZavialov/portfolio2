import dayjs from "dayjs"
const weekday = require("dayjs/plugin/weekday")
const weekOfYear = require("dayjs/plugin/weekOfYear")
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

async function initCalendar(){
    const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const TODAY = dayjs().format("YYYY-MM-DD");

    const INITIAL_YEAR = dayjs().format("YYYY");
    const INITIAL_MONTH = dayjs().format("M");

    let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
    let currentMonthDays;
    let previousMonthDays;
    let nextMonthDays;

    console.log(INITIAL_YEAR)
}
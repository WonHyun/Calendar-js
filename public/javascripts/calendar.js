var globalCurrentDate = {
  get date() {
    return this._date;
  },
  set date(date) {
    this._date = date;
    setCurrentDay(date);
    setCurrentMonth(date);
    getSchedule(date.getFullYear(), date.getMonth() + 1);
  }
};

const setCurrentDay = targetDate => {
  const dayName = ["일", "월", "화", "수", "목", "금", "토"];
  let dateText =
    targetDate.getDate() + "일 " + dayName[targetDate.getDay()] + "요일";
  $(".daily-calendar > span").text(dateText);
};

const setCurrentMonth = targetDate => {
  let dateText =
    targetDate.getFullYear() + "년 " + (targetDate.getMonth() + 1) + "월";

  let startDate = new Date(targetDate.getFullYear(), targetDate.getMonth());
  while (startDate.getDay()) startDate.setDate(startDate.getDate() - 1);

  let weeks = $(".monthly-calendar > .week");
  for (let week of weeks) {
    for (let day of week.getElementsByClassName("day")) {
      day.getElementsByClassName(
        "day-label"
      )[0].innerHTML = startDate.getDate();
      day.setAttribute("data-date", startDate);
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  $(".calendar-header > h4").text(dateText);
};

const createCalendarFrame = () => {
  const dayHtml = "<div class='day'><h3 class='day-label'></h3></div>";

  for (let i = 0; i < 6; i++) {
    let weekDiv = document.createElement("div");
    weekDiv.className = "week";
    for (let j = 0; j < 7; j++) {
      weekDiv.innerHTML += dayHtml;
    }
    $(".monthly-calendar").append(weekDiv);
  }
};

const moveNextMonth = () => {
  let current = globalCurrentDate.date;
  current.setMonth(current.getMonth() + 1);
  $("#datepicker-today").datetimepicker("date", current);
};
const moveBeforeMonth = () => {
  let current = globalCurrentDate.date;
  current.setMonth(current.getMonth() - 1);
  $("#datepicker-today").datetimepicker("date", current);
};

const calendarInit = () => {
  let current = new Date();
  createCalendarFrame();
  globalCurrentDate.date = current;
  $("#view li:first-child a").tab("show");
  $('[data-toggle="tooltip"]').tooltip();
  $("#datepicker-today").datetimepicker({
    autoClose: true,
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
  $("#datepicker-today").on("change.datetimepicker", function(e) {
    globalCurrentDate.date = e.date._d;
  });
  $("#next-month").on("click", moveNextMonth);
  $("#before-month").on("click", moveBeforeMonth);
};

$(function() {
  calendarInit();
});

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
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  $(".calendar-header > h4").text(dateText);
};

const createCalendarFrame = () => {
  const dayHtml = "<div class='day'><h3 class='day-label'></h3></div>";

  for (let i = 0; i < 5; i++) {
    let weekDiv = document.createElement("div");
    weekDiv.className = "week";
    for (let j = 0; j < 7; j++) {
      weekDiv.innerHTML += dayHtml;
    }
    $(".monthly-calendar").append(weekDiv);
  }
};

const moveNextMonth = () => {
  let current = $("#datepicker-today").datetimepicker("date");
  if (current !== null) {
    let nextDate = new Date(
      current._d.getFullYear(),
      current._d.getMonth() + 1
    );
    $("#datepicker-today").datetimepicker("date", nextDate);
  } else {
    let currentDate = new Date();
    let nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    $("#datepicker-today").datetimepicker("date", nextDate);
    setCurrentMonth(nextDate);
  }
};
const moveBeforeMonth = () => {
  let current = $("#datepicker-today").datetimepicker("date");
  if (current !== null) {
    let beforeDate = new Date(
      current._d.getFullYear(),
      current._d.getMonth() - 1
    );
    $("#datepicker-today").datetimepicker("date", beforeDate);
  } else {
    let currentDate = new Date();
    let beforeDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    $("#datepicker-today").datetimepicker("date", beforeDate);
    setCurrentMonth(beforeDate);
  }
};

const calendarInit = () => {
  let current = new Date();
  $("#view li:first-child a").tab("show");
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]')
    .popover()
    .on("inserted.bs.popover");
  $("#datepicker-today").datetimepicker({
    autoClose: true,
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
  $("#datepicker-today").on("change.datetimepicker", function(e) {
    if (e.oldDate !== null) {
      let currentDate = e.date._d;
      let oldDate = e.oldDate._d;
      if (
        currentDate.getFullYear() !== oldDate.getFullYear() ||
        currentDate.getMonth() !== oldDate.getMonth()
      ) {
        setCurrentMonth(e.date._d);
      }
    }
  });
  $("#next-month").on("click", moveNextMonth);
  $("#before-month").on("click", moveBeforeMonth);
  createCalendarFrame();
  setCurrentMonth(current);
};

$(function() {
  calendarInit();
});

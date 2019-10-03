const postScheduleWrite = schedule => {
  fetch("/schedule/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "same-origin",
    body: JSON.stringify({
      title: schedule.title,
      discription: schedule.discription,
      startAt: schedule.startAt,
      endAt: schedule.endAt,
      repeated: schedule.repeated
    })
  })
    .then(e => e.json())
    .then(e => console.log(e));
};

const getSchedule = () => {
  fetch("/schedule/2019/10")
    .then(e => e.json())
    .then(e => console.log(e));
};

$(function() {
  $(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
  });
});

$(function() {
  $("#datepicker-start").datetimepicker({
    autoClose: true,
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
  $("#datepicker-end").datetimepicker({
    autoClose: true,
    format: "YYYY-MM-DD"
  });
  $("#timepicker-start").datetimepicker({
    useCurrent: true,
    format: "LT"
  });
  $("#timepicker-end").datetimepicker({
    format: "LT"
  });
  $("#datepicker-start").on("change.datetimepicker", function(e) {
    $("#datepicker-end").datetimepicker("minDate", e.date);
  });
  $("#datepicker-end").on("change.datetimepicker", function(e) {
    $("#datepicker-start").datetimepicker("maxDate", e.date);
  });
  $(".day, .daily-calendar").click(function(e) {
    let currentDate = new Date(e.target.getAttribute("data-date"));
    $("#datepicker-start").datetimepicker("date", currentDate);
    $("#timepicker-start").datetimepicker("date", currentDate);
    $("#registerSchedule").modal("show");
  });
});

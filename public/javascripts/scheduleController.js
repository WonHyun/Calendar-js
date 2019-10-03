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
  $(".week, .daily-calendar").click(function() {
    $("#registerSchedule").modal("show");
  });
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
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
  $("#timepicker-start").datetimepicker({
    useCurrent: true,
    format: "LT"
  });
  $("#timepicker-end").datetimepicker({
    useCurrent: true,
    format: "LT"
  });
});

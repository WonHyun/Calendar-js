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

const scheduleWrite = () => {
  let title = $("#recipient-name").val();
  let startAtDate = new Date($("#datepicker-start").datetimepicker("date"));
  let endAtDate = new Date($("#datepicker-end").datetimepicker("date"));
  let startAtTime = new Date($("#timepicker-start").datetimepicker("date"));
  let endAtTime = new Date($("#timepicker-end").datetimepicker("date"));
  if (
    title !== "" &&
    startAtDate !== null &&
    startAtTime !== null &&
    endAtDate !== null &&
    endAtTime !== null
  ) {
    let startAt = startAtTime;
    startAt.setFullYear(startAtDate.getFullYear());
    startAt.setMonth(startAtDate.getMonth());
    startAt.setDate(startAtDate.getDate());

    let endAt = endAtTime;
    endAt.setFullYear(endAtDate.getFullYear());
    endAt.setMonth(endAtDate.getMonth());
    endAt.setDate(endAtDate.getDate());

    const schedule = {
      title: title,
      discription: $("#message-text").val(),
      startAt: startAt,
      endAt: endAt,
      repeated: $("#inlineCheckbox1").is(":checked")
    };
    console.log(schedule);
    postScheduleWrite(schedule);
    $("#registerSchedule").modal("hide");
  } else {
    alert("제목 또는 일정 기간을 입력해주세요.");
  }
};

const toggleAlldayDisable = () => {
  $("#datepicker-start").datetimepicker("enable");
  $("#timepicker-start").datetimepicker("enable");
  $("#datepicker-end").datetimepicker("enable");
  $("#timepicker-end").datetimepicker("enable");
};

const toggleAlldayEnable = () => {
  let currentDate = new Date($("#datepicker-start").datetimepicker("date"));
  $("#timepicker-start").datetimepicker("date", currentDate);
  $("#datepicker-end").datetimepicker("date", currentDate);

  currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setMilliseconds(currentDate.getMilliseconds() - 1);
  $("#timepicker-end").datetimepicker("date", currentDate);

  $("#datepicker-start").datetimepicker("disable");
  $("#timepicker-start").datetimepicker("disable");
  $("#datepicker-end").datetimepicker("disable");
  $("#timepicker-end").datetimepicker("disable");
};

const clearScheduleForm = () => {
  $("#recipient-name").val("");
  $("#message-text").val("");
  $("#datepicker-start").datetimepicker("date", null);
  $("#timepicker-start").datetimepicker("date", null);
  $("#datepicker-end").datetimepicker("date", null);
  $("#timepicker-end").datetimepicker("date", null);
  $("#inlineCheckbox1").prop("checked", false);
  $("#inlineCheckbox2").prop("checked", false);
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
    toggleAlldayDisable();
    clearScheduleForm();
    $("#datepicker-start").datetimepicker("date", currentDate);
    $("#timepicker-start").datetimepicker("date", currentDate);
    $("#registerSchedule").modal("show");
  });
  $(".modal-footer > .btn-primary").click(function(e) {
    scheduleWrite();
  });
  $("#inlineCheckbox2").click(function(e) {
    if (e.target.checked) {
      toggleAlldayEnable();
    } else {
      toggleAlldayDisable();
    }
  });
});

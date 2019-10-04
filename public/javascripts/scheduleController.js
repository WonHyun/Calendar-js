const postScheduleWrite = schedule => {
  fetch("/schedule/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "same-origin",
    body: JSON.stringify({
      title: schedule.title,
      description: schedule.description,
      startAt: schedule.startAt,
      endAt: schedule.endAt,
      repeated: schedule.repeated
    })
  })
    .then(e => e.json())
    .then(e => {
      if (e.success) {
        globalCurrentDate.date = schedule.startAt;
      } else {
        console.log(e);
        console.log("fail get schedules from db");
      }
    });
};

const getSchedule = (year, month) => {
  fetch("/schedule/" + year + "/" + month)
    .then(e => e.json())
    .then(e => {
      if (e.success) {
        showSchedule(e.schedules);
      } else {
        console.log(e);
        console.log("fail get schedules from db");
      }
    });
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
      description: $("#message-text").val(),
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

const scheduleViewTemplete = (schedule, eventType, diff, isDaily) => {
  let start = new Date(schedule.startAt);
  let end = new Date(schedule.endAt);
  let timeString = "";
  let dateString =
    start.getFullYear() +
    "년 " +
    (start.getMonth() + 1) +
    "월 " +
    start.getDate() +
    "일 ~ " +
    end.getFullYear() +
    "년 " +
    (end.getMonth() + 1) +
    "월 " +
    end.getDate() +
    "일";
  if (start.getHours() >= 0 && start.getHours() < 12) {
    timeString += "오전 ";
  } else {
    timeString += "오후 ";
  }

  timeString += start.getHours() + ": " + start.getMinutes() + " ~ ";

  if (end.getHours() >= 0 && end.getHours() < 12) {
    timeString += "오전 ";
  } else {
    timeString += "오후 ";
  }

  timeString += end.getHours() + ": " + end.getMinutes();

  if (schedule.description === "") schedule.description = "설명이 없습니다.";
  let html =
    `
  <div class="` +
    eventType +
    ` event-start event-end" data-span="` +
    diff +
    `" data-toggle="popover" data-html="true" `;
  if (isDaily) html += `data-placement='left'`;
  html +=
    `data-content='
    <div class="content-line">
      <div class="` +
    eventType +
    `-marking"></div>
      <div class="title">
        <h5>` +
    schedule.title +
    `</h5>
        <h7 class="reservation">` +
    dateString +
    `</h7>
        <span class="reservation-time">` +
    timeString +
    `</span>`;

  if (schedule.repeated) {
    html += `<div><span class="repeat-message">매월 반복</span></div>`;
  }

  html +=
    `</div>
    </div>
    <div class="content-line">
      <i class="material-icons">notes</i>
      <div class="title">
        <h7 class="reservation"> ` +
    schedule.description +
    `</h7></div>
    </div>'>` +
    schedule.title +
    `</div>`;
  return html;
};

const createScheduleView = schedule => {
  let start = new Date(schedule.startAt);
  let end = new Date(schedule.endAt);
  let diff = moment(end).diff(start, "day") + 1;
  let eventType = diff > 1 ? "event-consecutive" : "event";
  eventType = schedule.repeated ? "event-repeated" : eventType;

  // create monthly schedule
  let days = $(".day");
  for (let day of days) {
    if (!moment(new Date(day.getAttribute("data-date"))).diff(start, "day")) {
      day.innerHTML += scheduleViewTemplete(schedule, eventType, diff, false);
      break;
    }
  }

  //create daily schedule
  let currentDate = globalCurrentDate.date;
  if (
    !moment(currentDate).diff(start, "day") ||
    !moment(currentDate).diff(end, "day")
  ) {
    $(".daily-calendar").append(
      scheduleViewTemplete(schedule, eventType, diff, true)
    );
  }
};

const showSchedule = schedules => {
  $(".event-consecutive, .event, .event-repeated").remove();
  for (let schedule of schedules) {
    createScheduleView(schedule);
  }
  $(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
  });
  $('[data-toggle="popover"]')
    .popover()
    .on("inserted.bs.popover");
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
    let currentDate = new Date(e.currentTarget.getAttribute("data-date"));
    toggleAlldayDisable();
    clearScheduleForm();
    $("#datepicker-start").datetimepicker("date", currentDate);
    $("#timepicker-start").datetimepicker("date", currentDate);
    $("#datepicker-end").datetimepicker("date", currentDate);
    $("#timepicker-end").datetimepicker("date", currentDate);
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

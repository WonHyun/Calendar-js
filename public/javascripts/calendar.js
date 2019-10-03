const setCurrentMonth = targetDate => {
  let date =
    targetDate.getFullYear() + "년 " + (targetDate.getMonth() + 1) + "월";
  $(".calendar-header > h4").text(date);
};

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

$(function() {
  $("#view li:first-child a").tab("show");
});

$(function() {
  $('[data-toggle="popover"]')
    .popover()
    .on("inserted.bs.popover");
});

$(".week, .daily-calendar").click(function() {
  $("#registerSchedule").modal("show");
});

$(".event-consecutive, .event, .event-repeated").click(function(event) {
  event.stopPropagation();
});

$(function() {
  $("#datepicker-today").datetimepicker({
    autoClose: true,
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
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
  $("#datepicker-today").on("change.datetimepicker", function(e) {
    setCurrentMonth(e.date._d);
  });
});

$(function() {
  $("#timepicker-start").datetimepicker({
    useCurrent: true,
    format: "LT"
  });
  $("#timepicker-end").datetimepicker({
    useCurrent: true,
    format: "LT"
  });
});

$(function() {
  $(".calendar-header > h4").text(moment().format("YYYY[년] MM[월]"));
});

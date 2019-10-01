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
  $("#datepicker-start").datetimepicker({
    format: "YYYY-MM-DD"
  });
  $("#datepicker-end").datetimepicker({
    format: "YYYY-MM-DD"
  });
});

$(function() {
  $("#timepicker-start").datetimepicker({
    format: "LT"
  });
  $("#timepicker-end").datetimepicker({
    format: "LT"
  });
});

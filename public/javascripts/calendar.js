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
  $("#datetimepicker1").datetimepicker({
    format: "L"
  });
  $("#datetimepicker3").datetimepicker({
    format: "L"
  });
});

$(function() {
  $("#datetimepicker2").datetimepicker({
    format: "LT"
  });
  $("#datetimepicker4").datetimepicker({
    format: "LT"
  });
});

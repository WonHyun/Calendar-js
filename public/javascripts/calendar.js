const setCurrentMonth = targetDate => {
  let date =
    targetDate.getFullYear() + "년 " + (targetDate.getMonth() + 1) + "월";
  $(".calendar-header > h4").text(date);
};

$(function() {
  $("#view li:first-child a").tab("show");
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]')
    .popover()
    .on("inserted.bs.popover");
});

$(function() {
  $("#datepicker-today").datetimepicker({
    autoClose: true,
    useCurrent: true,
    format: "YYYY-MM-DD"
  });
  $("#datepicker-today").on("change.datetimepicker", function(e) {
    setCurrentMonth(e.date._d);
  });
});

$(function() {
  $(".calendar-header > h4").text(moment().format("YYYY[년] MM[월]"));
});

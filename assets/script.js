$(function () {
  // Added a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var eventId = $(this).parent().attr('id');
    var eventDescription = $(this).siblings('.description').val();

    localStorage.setItem(eventId, eventDescription);
  });

  // Applied the past, present, or future class to each time block
  function updateHourStatus() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      if (currentHour > blockHour) {
        $(this).removeClass("present future").addClass('past');
      } else if (currentHour === blockHour) {
        $(this).removeClass("past future").addClass('present');
      } else {
        $(this).removeClass("past present").addClass('future');
      }
    });
  }
  
  // Gets the user input saved in localStorage and set textarea values
  function loadEvents() {
    $(".time-block").each(function () {
      var eventId = $(this).attr('id');
      var eventDescription = localStorage.getItem(eventId);
      if (eventDescription !== null) {
        $(this).find('.description').val(eventDescription);
      }
    });
  }

  // Displays the current date in the page header
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Calls the functions to initialize page behavior
  updateHourStatus();
  loadEvents();

  // Updates time block colors every minute
  setInterval(updateHourStatus, 60000);
});

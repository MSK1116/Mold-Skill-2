$(document).ready(function () {
  // Keep track of correct answers and total marks
  var correctAnswers = 0;
  var totalMarks = 0;

  // Function to handle the form submission
  $("form").on("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Loop through each question
    $(".question").each(function (index) {
      var selectedOption = $(this).find(":checked").val();
      var correctOption = $(this).data("correct-option");
      var marks = $(this).data("marks");

      // Increment total marks
      totalMarks += marks;

      // Check if the selected option is correct
      if (selectedOption == correctOption) {
        correctAnswers++;
      }

      // Display the correct option
      $(this)
        .find(".correct-answer")
        .text("Correct answer: Option " + correctOption);
      $(this).find(".correct-answer").show();
    });

    // Display the marks
    $("#marks").text("You scored " + correctAnswers + " out of " + totalMarks + " marks");
    $("#marks").show();
    $("#submit").attr("disabled", true); // Disable the submit button
  });
});

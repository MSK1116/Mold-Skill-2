function checkAnswers() {
  var score = 0;

  var form = document.getElementById("quizForm");
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  var questions = form.getElementsByClassName("question");
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    var options = question.getElementsByTagName("input");
    var selectedOption = getSelectedOption(options);

    if (selectedOption && selectedOption.dataset.correct === "true") {
      score++;
    } else if (selectedOption) {
      var correctOption = question.querySelector("input[data-correct='true']");
      var correctAnswer = getOptionLabel(correctOption);

      var incorrectAnswerDiv = document.createElement("div");
      incorrectAnswerDiv.innerHTML = "Incorrect Answer. The correct answer is: " + correctAnswer;
      incorrectAnswerDiv.style.color = "red";
      question.parentNode.insertBefore(incorrectAnswerDiv, question.nextSibling);
    }
  }

  var percentage = (score / questions.length) * 100;
  resultDiv.innerHTML = "Your score: " + score + "/" + questions.length + " (" + percentage + "%)";

  // Disable the submit button
  document.getElementById("submit").disabled = true;
}

function getSelectedOption(options) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      return options[i];
    }
  }
  return null;
}

function getOptionLabel(option) {
  return option.nextSibling.textContent.trim();
}
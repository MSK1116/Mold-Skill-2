function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there are elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the current element with the random element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleQuestionsAndOptions() {
  var form = document.getElementById("quizForm");
  var questions = Array.from(form.getElementsByClassName("question"));
  questions = shuffleArray(questions);

  // Create a temporary container
  var container = document.createElement("div");

  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    var options = Array.from(question.getElementsByTagName("input"));
    options = shuffleArray(options);

    for (var j = 0; j < options.length; j++) {
      container.appendChild(options[j].parentNode);
    }

    container.appendChild(question);
  }

  // Clear the form
  form.innerHTML = "";

  // Append the shuffled elements back to the form
  while (container.firstChild) {
    form.appendChild(container.firstChild);
  }
}

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

    if (selectedOption && selectedOption.dataset.correct === "t") {
      score++;
    } else if (selectedOption) {
      var correctOption = question.querySelector("input[data-correct='t']");
      var correctLabel = correctOption.nextElementSibling;
      var correctAnswer = getOptionLabel(correctLabel);

      var incorrectAnswerDiv = document.createElement("div");
      incorrectAnswerDiv.innerHTML = "Incorrect Answer. The correct answer is: " + correctAnswer;
      incorrectAnswerDiv.style.color = "red";
      incorrectAnswerDiv.style.fontWeight = "bold";
      question.parentNode.insertBefore(incorrectAnswerDiv, question.nextSibling);
    }
  }

  resultDiv.innerHTML = "YOUR OBTAINED MARK: " + score + "/" + questions.length;

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
  return option.textContent.trim();
}

// Shuffle the questions and options on page load
shuffleQuestionsAndOptions();

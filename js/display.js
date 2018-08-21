var activePlayer = 1;

// generate player boxes
var playerScoreArea = document.getElementById('player-score-area');
var playerData = JSON.parse(localStorage.getItem('playerArr'));

playerData.forEach(function(player) {
  new Player(player);
});

playerArr.forEach(function(player) {
  var newDiv = document.createElement('div');
  newDiv.classList.add('player');
  var newH3 = document.createElement('h3');
  newH3.classList.add('yellow');
  newH3.innerText = player.name;
  var newP = document.createElement('p');
  newP.classList.add('white-smoke');
  newP.innerText = player.score;
  newDiv.appendChild(newH3);
  newDiv.appendChild(newP);
  playerScoreArea.appendChild(newDiv);
});

// 

// get questions
var questionText = document.getElementById('question-text');
var questionHead = document.getElementById('question-head');
var answerDiv = document.getElementById('answer-div');
var questionPool = [];
var usedQuestions = [];

function getRandomQuestion() {
  var qNum = Math.floor(Math.random() * allQuestions.length);
  while (usedQuestions.includes(qNum)) {
    qNum = Math.floor(Math.random() * allQuestions.length);
  }
  var selectedQuestion = allQuestions[qNum];
  usedQuestions.push(qNum);
  questionHead.innerText = `Here is your next category:`
  questionText.innerText = `${selectedQuestion.category}`;
  createPickerButton(selectedQuestion);
}

function clearAnswers() {
  while(answerDiv.firstChild) {
    answerDiv.removeChild(answerDiv.firstChild);
  }
}

function createPickerButton(question) {
  clearAnswers();
  for (var i = 0; i < playerData.length; i++) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('individual-answers');
    var newP = document.createElement('p');
    newDiv.classList.add('small-answer-text');
    newP.innerText = `Make ${playerData[i]} answer.`;
    newDiv.appendChild(newP);
    answerDiv.appendChild(newDiv);
    newDiv.addEventListener('click', function() {
      displayQuestion(question);
    });
  }
}

function displayQuestion(question) {
  questionHead.innerText = 'Question:';
  questionText.innerText = question.question;
  populateAnswers(question.answers);
  adjustAnswerText();
}

function populateAnswers(answers) {
  clearAnswers();
  var scrambledAnswers = [];
  var answerIndex = Math.floor(Math.random() * answers.length);
  for (var i = 0; i < answers.length; i++) {
    while (scrambledAnswers.includes(answerIndex)) {
      answerIndex = Math.floor(Math.random() * answers.length);
    }
    scrambledAnswers.push(answerIndex);
    var newAnswer = document.createElement('div');
    newAnswer.classList.add('individual-answers');
    var newPTag = document.createElement('p');
    newPTag.innerText = answers[answerIndex];
    newAnswer.appendChild(newPTag);
    answerDiv.appendChild(newAnswer);
  }
}

// dynamically set the font size for lengthier answers
function adjustAnswerText() {
  var answerDivs = document.getElementsByClassName('individual-answers');

  for (var i = 0; i < answerDivs.length; i++) {
    answerDivs[i].classList.remove('small-answer-text');
    if (answerDivs[i].innerText.length > 14) {
      answerDivs[i].classList.add('small-answer-text');
    }
  }
}

getRandomQuestion();
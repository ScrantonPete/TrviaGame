var audio = new Audio("assets/images/dog.mp3");
$(".btn-primary").click(() => audio.play());

var triviaQuestions = [
  {
    question:
      "I am the velcro dog!  I was made famous for being a barge dog, as I will alert you when I notice something out of the ordinary with my sharp bark.  I am fluffy and in the Spitz family.  Many years ago I was know as a Wolf Spitz.",
    answerList: ["Keeshond", "Pomeranian", "Great Dane", "Springer Spaniel"],
    answer: 0
  },
  {
    question:
      "I am one of the best family dogs!  I am very popular in the US and Canada. I am curious, exploratory, and love company.  I might be black, chocolate, or yellow, which can actually range from almost white to fox red.",
    answerList: ["Rottweiler", "St. Bernard", "Labroador", "Chow-Chow"],
    answer: 2
  },
  {
    question:
      "I excel at water rescues!  Mainly because I have a muscular build, a thick double coat, and webbed feet.  I can weigh over 200 lbs., which means I shed hair like there's no tomorrow!  But the Sweetness of Temperment is the hallmark of my breed.",
    answerList: ["Pointer", "Newfoundland", "German Shepherd", "Poodle"],
    answer: 1
  },
  {
    question:
      "You better train me well, or I'll rule the house!  I am the smallest dog breed, which means I generally don't get teh obedience training I deserve.  I can have many health problems, especially in my mouth, so brush my teeth daily!  Folklore puts my origins in Mexico.",
    answerList: ["Pug", "Boxer", "French Bulldog", "Chihuahua"],
    answer: 3
  },
  {
    question:
      "I am intelligent, but stubborn!  I have a superior sense of smell, which makes me great at SNOOPY-ING.  My two best friends are a balding child and yellow tweety bird.",
    answerList: ["Beagle", "Dobermann", "Husky", "Dashchund"],
    answer: 0
  },
  {
    question:
      "Wrinkles, wrinkles, and more wrinkles!  But as I age my wrinkles tend to spread out as I grow into my skin.  You may also recognize me by me blue-black tongue.  If that doesn't give me away, maybe telling you that my homeland is China.",
    answerList: [
      "Boston Terrier",
      "Border Collie",
      "Australian Shepherd",
      "Shar Pei"
    ],
    answer: 3
  },
  {
    question:
      "Brrr...  It's cold in here!  Can you pass me a BLANKET?  From behind you may confuse me with a person with long flowing hair.  You may also recognize me as the first dog to be successfully cloned in 2005 by Korean scientists.",
    answerList: ["Maltese", "Sheltie", "Afghan Hound", "Bichon Frise"],
    answer: 2
  },
  {
    question:
      "Even though Seinfeld thinks so, I probably did not eat your baby, LOL!  My oldest fossil was found in Western Australia, almost 3500 years ago.  Even though I am comfortable around humans, you'll probably see me living by myself as I am self-sufficient.",
    answerList: ["Dingo", "Akita", "Havanese", "Basset Hound"],
    answer: 0
  }
];

var pictureArray = [
  "question1",
  "question2",
  "question3",
  "question4",
  "question5",
  "question6",
  "question7",
  "question8",
  "question9",
  "question10",
  "question11",
  "question12",
  "question13",
  "question14",
  "question15"
];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
  correct: "Bark Bark!  You know your pups!",
  incorrect: "Ruff Ruff! You're a Cat Lady!",
  endTime: "You could have guessed!",
  finished: "Here is how much you know about dogs!"
};

$("#startBtn").on("click", function() {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function() {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#picture").empty();
  answered = true;

  //sets up new questions & answerList
  $("#currentQuestion").html(
    "Dog Breed #" + (currentQuestion + 1) + "/" + triviaQuestions.length
  );
  $(".question").html(
    "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
  );
  for (var i = 0; i < 4; i++) {
    var choices = $("<div>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answerList").append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $(".thisChoice").on("click", function() {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 15;
  $("#timeLeftCounter").html("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $("#timeLeftCounter").html("<h3>Time Remaining: " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $("#currentQuestion").empty();
  $(".thisChoice").empty(); //Clears question page
  $(".question").empty();

  var rightAnswerText =
    triviaQuestions[currentQuestion].answerList[
      triviaQuestions[currentQuestion].answer
    ];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  $("#picture").html(
    '<img src = "assets/images/' +
      pictureArray[currentQuestion] +
      '.jpg" width = "400px">'
  );
  //checks to see correct, incorrect, or unanswered
  if (userSelect == rightAnswerIndex && answered == true) {
    correctAnswer++;
    $("#message").html(messages.correct);
  } else if (userSelect != rightAnswerIndex && answered == true) {
    incorrectAnswer++;
    $("#message").html(messages.incorrect);
    $("#correctedAnswer").html("The correct dog was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct dog was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == triviaQuestions.length - 1) {
    setTimeout(scoreboard, 5000);
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 5000);
  }
}

function scoreboard() {
  $("#timeLeftCounter").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#picture").empty();

  $("#finalMessage").html(messages.finished);
  $("#correctAnswers").html("Correct Dog Breeds: " + correctAnswer);
  $("#incorrectAnswers").html("Incorrect Dog Breeds: " + incorrectAnswer);
  $("#unanswered").html("Why didn't you answer? countS: " + unanswered);
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over?");
}

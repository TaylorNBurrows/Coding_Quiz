var quiz = 0, status, initials, choice, choices, choiceA, choiceB, choiceC, choiceD, question, correct = 0;
var pos = 0;
var resultEl = document.getElementById("result");
var totalScore = 0;
var finalIntEl = document.getElementById("finalInt");
var intStorage = localStorage.getItem("intStorage");
var score = localStorage.getItem("score");
var highscoreDisplay = document.getElementById("grade");
var timeEl = document.querySelector("#timer");
let initialsEl = document.getElementById("initials");


var questions = [
    ["Which of the following is not one of the 7 different data types in Javascript","object","boolean","string","prompts","D"],
    ["Which operator allows you to store a value inside of a variable?","=","+", "-","<","A"],
    ["The value of a variable can be assigned at the same time as creating the variable","True","False","Neither True Nor False","None of the above","A"],
    ["What does a prompt expect from the user","An Input","A confirmation","A Taco","A Boolean","A"],
    ["What does the 'This' keyword mean in Javascript","Call 'this' latest function","The object from where it was called","The location within the DOM","The relationship between parent and the child","B"],
    ["Which of the following could be used to select an HTML with the following (#thisIsMyID)","document.getId(#thisIsMyID)","document.getId(#thisIsMyID)","document.getElementById(#thisIsMyId)","document.getElementById(.thisIsMyId)","C"],
];

var secondsLeft = 90;
function setTime(){
    var timerInterval = setInterval(() => {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if(secondsLeft < 1){
            clearInterval(timerInterval);
            timesUp();
        }
    }, 1000);

}

function _(x){
    return document.getElementById(x);
}

function renderQuestion(){
    quiz = _("quiz");
    
    if(pos >= questions.length){
        quiz.innerHTML = "<h2> You got " + correct + " of " + questions.length + " questions correct<br><br><br> Your final score is: " + totalScore + ".</h2><hr><br>Enter initials: " + "<input type='text' id='initials' required minlength='1' maxlength='3'><button  id='submitInitial' class='btn btn-light m-auto' style='border-color:darkgray'> Submit </button>";
        let initialsEl = document.getElementById("initials");
        
        const submitInitBtn = document.getElementById("submitInitial");

            submitInitBtn.addEventListener("click", function(event){
                event.preventDefault();
                var userInitials = initialsEl.value;
                if (initialsEl.value == '' || initialsEl.value == null){
                    resultEl.innerHTML = "<p style= 'color: red;'>Invalid input. Please enter your initials!</p>";
                }
                else{
                window.location = "highscore.html";
                localStorage.setItem('userInitial', JSON.stringify(userInitials));
                highScore();
                }
            });


            _("status").innerHTML = "Quiz Completed!";
            pos = 0;
            correct = 0;
            resultEl.innerHTML = " ";
            return false; 
    }


    _("status").innerHTML = "Question " + (pos+1) + " of " + questions.length + "<br><br>";
    question = questions[pos][0];
    choiceA = questions[pos][1];
    choiceB = questions[pos][2];
    choiceC = questions[pos][3];
    choiceD = questions[pos][4];

    quiz.innerHTML = "<h3>" + question + "</h3>";
    quiz.innerHTML += "<input type='radio' name='choices' value='A'> "+ choiceA + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='B'> "+ choiceB + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='C'> "+ choiceC + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='D'> "+ choiceD + "<br><br>";
    quiz.innerHTML += "<button onclick='checkAnswer()' class='btn btn-light m-auto'style='border-color:darkgray'> Submit </button>" + "<br><br><hr>";
    
    
}

function checkAnswer(){
    
    choices = document.getElementsByName("choices"); 
    for (var i = 0; i < choices.length; i++) {
        if(choices[i].checked){
            choice = choices[i].value;
        }   
    }
    if(choice == questions[pos][5]){
        resultEl.innerHTML = "<p style='color: green;'>Correct!</p>";
        correct++;
        totalScore = totalScore + 5;
    }
    else{
        totalScore = totalScore - 1;
        resultEl.innerHTML = "<p style='color: red;'>Wrong!</p>";
        console.log(totalScore);
        secondsLeft = secondsLeft - 5;
    }
    localStorage.setItem('totalScore', JSON.stringify(totalScore));
    pos++;
    renderQuestion();
}
function timesUp(){

    _("status").innerHTML = "<h1> Time's Up! </h1><br>";
    alert("Time's Up")
    resultEl.innerHTML = "";
    // quiz.innerHTML= "";
    let initialsEl = document.getElementById("initials");
    const submitInitBtn = document.getElementById("submitInitial");

    submitInitBtn.addEventListener("click", function(event){
        event.preventDefault();
        var userInitials = initialsEl.value;
        if (initialsEl.value == '' || initialsEl.value == null){
            resultEl.innerHTML = "<p style= 'color: red;'>Invalid input. Please enter your initials!</p>";
        }
        else{
        window.location = "highscore.html";
        localStorage.setItem('userInitials', JSON.stringify(userInitials));
        highScore();
        }
    });



}
function highScore(){

    var clrBtn = _("clearHighscores");
    
    var retrieveInitials = JSON.parse(localStorage.getItem('userInitial'));
    var retrieveScore = localStorage.getItem('totalScore');
    retrieveScore.innerHTML = totalScore;
    console.log(retrieveScore);
    console.log(retrieveInitials);
    
    highscoreDisplay.innerHTML += retrieveInitials + ": " + retrieveScore;

    clrBtn.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("grade").innerHTML = "";
        
    });
}



window.addEventListener("load", highScore, false);
window.addEventListener("load", function() {
    setTime()
    renderQuestion()
});
//declaring the colors of buttons existing
const buttonColor = ["green","red","yellow","blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

//Answer Click Event
$("button").on("click", function(event){
    var userChosenColor = $(this).attr("id");  
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    var no = (userClickedPattern.length-1);
    checkAnswer(no);

});

//Answer Checker
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                newSequence();
                userClickedPattern = [];
              }, 1000);
        }
    }else{
        $("h1").text("Game Over ! Press any key to Start Over");
        started = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];

        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over')}, 200);

    }
}

$(document).on("keypress",function(event){
    if (!started){
        $("h1").text("Level "+level);
        newSequence();
        started = true;
    }
})

function newSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass('pressed');
    setTimeout(function(){
    $("."+currentColor).removeClass('pressed')}, 100);
}


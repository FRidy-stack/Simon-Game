var gamePattern = [];
var userPatter = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    level = 0;
    if(!started){
        started = true
        nextSecquence();
    }
    
});

function nextSecquence(){
    userPatter = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var buttonColours = ["red","blue","green","yellow"];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

$(".btn").click(function(){
    if(started){
        var useChosenColour = this.id;
        userPatter.push(useChosenColour);
        console.log(useChosenColour);
        playSound(useChosenColour);
        animatePress(useChosenColour);
        checkAnswer(userPatter.length -1);

    }
})

function checkAnswer(currlevel){
    if(userPatter[currlevel] === gamePattern[currlevel]){
        if(userPatter.length === gamePattern.length){
            console.log("sucess");
            setTimeout(function(){
                nextSecquence();
            },1000);
        }
    }else{
        console.log("failure");
        $("h1").text("Wrong Answer !!");

        $("body").addClass("game-over");
        setTimeout(function (){
            playSound("wrong");
            $("body").removeClass("game-over");
            startOver();
        },200);
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
    $("#level-title").text("Press A key to Start the game");
}

function playSound(val){
    switch (val) {
        case "green":
            var soundg = new Audio("sounds/green.mp3");
            soundg.play();
            break;
        case "blue":
            var soundb = new Audio("sounds/blue.mp3");
            soundb.play();
            break;
        case "red":
            var soundr = new Audio("sounds/red.mp3");
            soundr.play();
            break;
        case "yellow":
            var soundy = new Audio("sounds/yellow.mp3");
            soundy.play();
            break;
        case "wrong":
            var soundw = new Audio("sounds/wrong.mp3");
            soundw.play();
            break; 
        default:
            break;
    }
}

function animatePress(currentcolor){
    document.querySelector("#"+currentcolor).classList.add("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100)
}

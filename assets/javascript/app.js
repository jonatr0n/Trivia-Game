$(document).ready(function () {
    var options = [
        {
            question: "What Pokemon does Pikachu evolve into?",
            choice: ["Raichu", "Jolteon", "Electvire", "Meowth"],
            answer: 0,
            // photo: "assets/images/pupusas.jpg"
        },
        {
            question: "What's the most effective Poke Ball in the game?",
            choice: ["Great Ball", "Master Ball", "Ultra Ball", "Timer Ball"],
            answer: 1,
            // photo: "assets/images/mtdew.gif"
        },
        {
            question: "How many Gym Badges must a trainer collect before challenging the Elite Four?",
            choice: ["6", "7", "8", "9"],
            answer: 2,
            // photo: "assets/images/coffee.gif"
        },
        {
            question: "What's the device trainers use to keep a record of their Pokemon encounters?",
            choice: ["Pokecounter", "Pokefinder", "Pokedex", "Pokephone"],
            answer: 2,
            // photo: "assets/images/harvey.jpg"
        },
        {
            question: "If you need to buy supplies in the Pokemon world, where do you go?",
            choice: ["Pokemon Center", "Gym", "Pokemart", "Poke Dep"],
            answer: 2,
            // photo: "assets/images/dozen.jpg"
        },
        {
            question: "If you need to revive your fainted Pokemon to full health, where do you go?",
            choice: ["Mount Fuji", "Pokemon Center", "Pokemon Mansion", "Gym"],
            answer: 1,
            // photo: "assets/images/herring.jpg"
        },
        {
            question: "What are the three types of starter Pokemon?",
            choice: ["Psychic, Fighting and Ghost", "Grass, Fire and Water", "Electric, Ground and Poison", "Dragon, Flying and Normal"],
            answer: 1,
            // photo: "assets/images/lemon.gif"
        },
        {
            question: "What type of attacks are Normal type Pokemon immune to?",
            choice: ["Fighting", "Dark", "Ghost", "Fire"],
            answer: 2,
            // photo: "assets/images/guava.gif"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    // START GAME
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    // TIMER FUNCTIONS
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }


// QUESTION FUNCTIONS
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        // $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidepic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 15;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3> Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 1000); /* this is the timing between questions */


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})
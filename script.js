const quiz = new Quiz(questions);
const ui = new UI();

//---------Start Button Event-----------------
ui.btnStart.addEventListener("click", function(){
        ui.quizBox.classList.add("active");
        startTimer(10);
        startTimerLine();
        displayQuestion(quiz.fetchQuestion());
        ui.nextQuestion.classList.remove("show");
        ui.scoreBox.classList.remove("done");
        ui.scoreBox.classList.remove("good_score");
        ui.scoreBox.classList.remove("bad_score");

})
//---------Start Button Event End-------------

//--------Next Question Event-----------------
ui.nextQuestion.addEventListener("click", function(){
    if(quiz.questions.length != quiz.questionIndex +1){
        ui.quizBox.classList.add("active");
        quiz.questionIndex +=1 ; 
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        ui.timeText.textContent = "Time Remaining";
        ui.nextQuestion.classList.remove("show");
        displayQuestion(quiz.fetchQuestion());     
    }else{
        ui.quizBox.classList.remove("active");
        if(quiz.rightAnswers >= quiz.questions.length / 2){
            ui.scoreBox.classList.add("done");
            ui.scoreBox.classList.add("good_score");
            ui.scoreText.textContent = `${quiz.rightAnswers} out of ${quiz.questions.length} questions answered correctly`
        }else{
            ui.scoreText.textContent = `${quiz.rightAnswers} out of ${quiz.questions.length} questions answered correctly`
            ui.scoreBox.classList.add("done");
            ui.scoreBox.classList.add("bad_score");
        }
    }
});
//---------Next Question Event End-------------

//---------End Button Events-------------------
ui.btnEnd.addEventListener("click", function(){
    window.location.reload();
})

ui.btnReplay.addEventListener("click", function(){
    quiz.questionIndex = 0;
    quiz.rightAnswers = 0;
    ui.btnStart.click();
})

//------Display Function (Also Calls Question Number Display)---------
function displayQuestion(question){
    let questionDisplayed = `<span>${question.questionText}</span>`;
    let options = ``

    for(let ans in question.answers){
        options +=
        `
            <div class="option">
            <span><b>${ans}</b>: ${question.answers[ans]}</span>
            </div>
        `;
    }

    displayQuestionNumber(quiz.questionIndex, quiz.questions.length);

    document.querySelector(".question-text").innerHTML = questionDisplayed;
    ui.optionList.innerHTML = options;

    const option = ui.optionList.querySelectorAll(".option");

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)")
    }

}

//---------Option Select Function (Also Checks the Answer and Disables Second Selection)------
function optionSelected(option){
    clearInterval(counter);
    clearInterval(counterLine);
    let answer  = option.querySelector("span b").textContent;
    let question = quiz.fetchQuestion();

    if(question.checkAnswer(answer)){
        quiz.rightAnswers += 1;
        option.classList.add("correct");
    }else{
        option.classList.add("incorrect");
    }

    for(let i=0; i < ui.optionList.children.length; i++){
        ui.optionList.children[i].classList.add("disabled");
    }

    ui.nextQuestion.classList.add("show");
}

//Question Number Display (Called on Main Dİsplay Function)
function displayQuestionNumber(questionNumber, totalQuestions){
    let tag = `${questionNumber + 1} / ${totalQuestions}`;
    document.querySelector(".badge").textContent = tag;
}

let counter;
function startTimer(time){
    counter = setInterval(timer, 1000);
        function timer(){
            ui.timeSecond.textContent = time;
            time--;

            if(time < 0) {
                clearInterval(counter);
                ui.timeText.textContent = "Time is Up";

                let ans = quiz.fetchQuestion().rightAnswer;

                for(let i of ui.optionList.children){
                    if(i.querySelector("span b").textContent == ans){
                        i.classList.add("correct");
                    }

                    i.classList.add("disabled");
                }

                ui.nextQuestion.classList.add("show");
            }
        }
    }

let counterLine;
function startTimerLine() {
    let lineWidth = 0;

    counterLine = setInterval(timer, 17);

    function timer(){
        lineWidth += 1;
        ui.timeLine.style.width = lineWidth + "px";

        if(lineWidth >649){
            clearInterval(counterLine);
        }
    }
}    
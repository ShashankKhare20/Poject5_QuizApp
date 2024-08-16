const container = document.querySelector('.container');
const questionBox = document.querySelector('.questions');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');

// Making an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];

currentQuestionIndex = 0;
let score = 0;
let quizOver = false;

//Function to show next question
const showQuestions = function() {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i=0;i<questionDetails.choices.length;i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        })
    }
}

//Function to check answers
const showAnswers = function (){
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        displayAlert(`Correct Answer!`)
        score++;
    }
    else{
        displayAlert("Wrong answer")
    }
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
        showQuestions();
    }
    else{
        showScore();
        quizOver = true;
    }
}

//Function to show score
const showScore = function() {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed your quiz")
    nextBtn.textContent = "Play again";
}

//Function to show alert
const displayAlert = function(msg) {
    alert.style.display = 'block';
        alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = 'none';
    },2000)
}

//Adding event listener to start button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    showQuestions();
});

nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        displayAlert("Select your answer!")
        return;
    }
    if(quizOver){
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        showQuestions();
        quizOver = false;
    }
    else{
        showAnswers();
    }
    showAnswers();
});











































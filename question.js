function Question(questionText, answers, rightAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.rightAnswer = rightAnswer;
}

Question.prototype.checkAnswer = function(ans) {
    return ans === this.rightAnswer;
}

let questions = [
    new Question("Which one is a packet manager for Javascript",{ a: "Node.js", b: "npm", c: "nuget", d:"asd"}, "b"),
    new Question("Which one is a packet manager for .net",{ a: "Node.js", b: "npm", c: "nuget"}, "c"),
    new Question("Which one is a packet manager for 3",{ a: "Node.js", b: "npm", c: "nuget"}, "c"),
    new Question("Which one is a packet manager for 4",{ a: "Node.js", b: "npm", c: "nuget"}, "c"),
]

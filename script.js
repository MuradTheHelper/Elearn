let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();
    shuffleArray(questions);
    showQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('progress').textContent = currentQuestion + 1;
}

function selectOption(index) {
    const options = document.getElementById('options').children;
    for (let i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = i === index ? '#ddd' : '';
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector('#options button[style="background-color: rgb(221, 221, 221);"]');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }
    
    const question = questions[currentQuestion];
    const userAnswer = selectedOption.textContent;
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
        document.getElementById('result').style.color = 'green';
    } else {
        document.getElementById('result').textContent = `Incorrect. The correct answer is: ${question.correctAnswer}`;
        document.getElementById('result').style.color = 'red';
    }
    
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < 5) {
        showQuestion();
    } else {
        showSummary();
    }
}

function showSummary() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('summary-container').style.display = 'block';
    document.getElementById('score').textContent = score;
    
    const recommendation = document.getElementById('recommendation');
    if (score < 3) {
        recommendation.textContent = 'You should focus on improving your overall English skills. Try reviewing basic grammar rules and vocabulary.';
    } else if (score < 5) {
        recommendation.textContent = 'Good job! To improve further, practice more complex sentence structures and expand your vocabulary.';
    } else {
        recommendation.textContent = 'Excellent work! Keep challenging yourself with advanced English materials and practice speaking regularly.';
    }
}


function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('submit-btn').disabled = true; // Nonaktifkan tombol submit sampai opsi dipilih
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('progress').textContent = currentQuestion + 1;
}

function selectOption(index) {
    const options = document.getElementById('options').children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
    options[index].classList.add('selected');
    
    // Aktifkan tombol submit ketika opsi dipilih
    document.getElementById('submit-btn').disabled = false;
}

function submitAnswer() {
    const selectedOption = document.querySelector('#options button.selected');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }
    
    const question = questions[currentQuestion];
    const userAnswer = selectedOption.textContent;
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
        document.getElementById('result').style.color = '#27ae60';
        selectedOption.style.backgroundColor = '#a9dfbf'; // Highlight jawaban benar
    } else {
        document.getElementById('result').textContent = `Incorrect. The correct answer is: ${question.correctAnswer}`;
        document.getElementById('result').style.color = '#c0392b';
        selectedOption.style.backgroundColor = '#f5b7b1'; // Highlight jawaban salah
        
        // Highlight jawaban yang benar
        const options = document.getElementById('options').children;
        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent === question.correctAnswer) {
                options[i].style.backgroundColor = '#a9dfbf';
                break;
            }
        }
    }
    
    // Nonaktifkan semua tombol opsi setelah submit
    const options = document.getElementById('options').children;
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }
    
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    shuffleArray(questions);
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('progress-container').style.display = 'block';
    document.getElementById('summary-container').style.display = 'none';
    showQuestion();
}

document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

loadQuestions();
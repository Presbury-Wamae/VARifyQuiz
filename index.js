document.addEventListener('DOMContentLoaded', () => {
    
    // DOM elements
    const competitionButtons = document.querySelectorAll('.competition-btn');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const container = document.getElementById('container');
    
    const quizData = {"questions": [] }
            fetch("https://varifyquiz.onrender.com/questions")
            .then(response => response.json())
            .then(questions =>{
                quizData.questions = questions;
                console.log("Questions fetched successfully", quizData.questions);
            })
            .catch(error => console.error("Error fetching questions", error));
    
    
    // Quiz state
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedCompetition = '';
    let selectedDifficulty = '';

    // Event listeners
    competitionButtons.forEach(button => {
        button.addEventListener('click', handleCompetitionSelection);
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', handleDifficultySelection);
    });

    // Functions
    function handleCompetitionSelection(e) {
        selectedCompetition = e.target.textContent;
        highlightSelectedButton(e.target, competitionButtons);
        document.querySelector('.paragragh').style.display = 'none';
    }

    function handleDifficultySelection(e) {
        selectedDifficulty = e.target.textContent;
        highlightSelectedButton(e.target, difficultyButtons);
        
        if (selectedCompetition) {
            startQuiz();
        } else {
            alert('Please select a competition first!');
        }
    }

    function highlightSelectedButton(selectedButton, buttons) {
        buttons.forEach(button => {
            button.style.backgroundColor = '';
            button.style.color = '';
        });
        selectedButton.style.backgroundColor = '#4CAF50';
        selectedButton.style.color = 'white';
    }

    function startQuiz() {
        if (quizData.questions.length === 0) {
            alert('No questions available for quiz!');
            return;
        }
        

        // Filter questions based on competition and difficulty
        currentQuestions = quizData.questions.filter(question => 
            question.competition === selectedCompetition && 
            question.difficulty === selectedDifficulty
        );

        if (currentQuestions.length === 0) {
            alert('No questions available for selected competition and difficulty!');
            return;
        }

        // Shuffle questions to randomize
        currentQuestions = shuffleArray(currentQuestions);

        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;

        // Display first question
        displayQuestion();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function displayQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            showResults();
            return;
        }

        const question = currentQuestions[currentQuestionIndex];
        
        container.innerHTML = `
            <section class="quiz-container">
                <div class="quiz-header">
                    <h2>${question.competition} - ${question.difficulty}</h2>
                    <p>Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</p>
                    <p>Score: ${score}</p>
                </div>
                <div class="question">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    ${question.options.map(option => 
                        `<button class="option-btn">${option}</button>`
                    ).join('')}
                </div>
            </section>
        `;

        // Add event listeners to option buttons
        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', handleAnswerSelection);
        });
    }

    function handleAnswerSelection(e) {
        const selectedAnswer = e.target.textContent;
        const correctAnswer = currentQuestions[currentQuestionIndex].answer;
        
        if (selectedAnswer === correctAnswer) {
            e.target.style.backgroundColor = '#4CAF50';
            score++;
        } else {
            e.target.style.backgroundColor = '#f44336';
            // Highlight correct answer
            document.querySelectorAll('.option-btn').forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.style.backgroundColor = '#4CAF50';
                }
            });
        }

        // Disable all buttons after selection
        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = true;
        });

        // Move to next question after a delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    }

    function showResults() {
        let percentage = Math.round((score / currentQuestions.length) * 100);
        let message = '';

        // Determine message based on score
        if (percentage === 100) {
            message = "🎉 You are a Genius! 🏆";
        } else if (percentage >= 70) {
            message = "🔥 Great Job! You really know your football! ⚽";
        } else if (percentage >= 50) {
            message = "👍 Good Effort! Keep practicing! 💪";
        } else {
            message = "😢 Try your luck next time! Don't give up! 💡";
        } 
         container.innerHTML = `
            <section class="results-container">
                <h2>Quiz Completed!</h2>
                <p>Your final score: ${score} out of ${currentQuestions.length}</p>
                <p>Percentage: ${percentage}%</p>
                <h3>${message}</h3>
                <button id="restart-btn">Restart Quiz</button>
                <button id="new-quiz-btn">New Quiz</button>
            </section>
        `;

        // Add event listeners to result buttons
        document.getElementById('restart-btn').addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            displayQuestion();
        });

        document.getElementById('new-quiz-btn').addEventListener('click', () => {
            location.reload(); // Simple way to reset, could be improved
        });
    }

    // Third distinct event listener - keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (confirm('Are you sure you want to exit the quiz?')) {
                location.reload();
            }
        }
    });
    const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
});


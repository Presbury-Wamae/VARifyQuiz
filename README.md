# VARify Quiz

## Overview
VARify Quiz is an interactive football quiz application that allows users to test their knowledge of football competitions, player statistics, and world tournaments. Users can select a competition and difficulty level before answering randomized multiple-choice questions. The app tracks scores, provides instant feedback, and displays final results.

## Features
- **Multiple Quiz Categories**: Users can choose from different football competitions (Premier League, World Cup, etc.).
- **Difficulty Levels**: Offers Easy, Medium, and Hard difficulty levels.
- **Randomized Questions**: Questions are shuffled to prevent repetition.
- **Score Tracking**: Users can track their progress throughout the quiz.
- **Real-time Feedback**: Provides immediate feedback on answers.
- **Final Score Summary**: Displays final score and percentage after completing the quiz.
- **Keyboard Navigation**: Press `Escape` to exit the quiz.
- **Leaderboard (Future Feature)**: Ability to store and display high scores.

## Technologies Used
- **HTML**: Structure of the quiz interface.
- **CSS**: Styling for the application.
- **JavaScript (ES6)**: Interactive logic, event handling, and data processing.
- **JSON Server**: Simulates a backend API for fetching quiz questions.

## Setup Instructions
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/VARify-Quiz.git
cd VARify-Quiz
```

### 2. Install Dependencies
Ensure you have `json-server` installed globally:
```sh
npm install -g json-server
```

### 3. Start the JSON Server
Run the following command to start the local server:
```sh
json-server --watch db.json --port 3000
```
This will host quiz questions at `http://localhost:3000/questions`.

### 4. Open the Project
Simply open `index.html` in your browser.

## How It Works
### 1. Selecting a Quiz
- Click on a **competition button** to choose a category.
- Click on a **difficulty button** to select a difficulty level.
- The quiz starts once both selections are made.

### 2. Answering Questions
- Each question has multiple-choice answers.
- Click an answer button to submit your choice.
- The selected answer turns **green** (correct) or **red** (incorrect).
- The correct answer is highlighted if the choice was wrong.
- The next question appears after a short delay.

### 3. Completing the Quiz
- The final score and percentage are displayed at the end.
- Users can restart the quiz or select a new category.
- Pressing `Escape` prompts an exit confirmation.

## Code Structure
```
VARify-Quiz/
│── index.html       # Main HTML file
│── styles.css       # Styling file
│── script.js        # JavaScript logic
│── db.json          # JSON file with quiz questions
└── README.md        # Project documentation
```

## Future Improvements
- **Leaderboard**: Store and display high scores.
- **Timer**: Add a countdown for each question.
- **More Categories**: Expand quiz categories beyond football.
- **Mobile Optimization**: Improve responsiveness.

## Contributing
If you’d like to contribute, follow these steps:
1. **Fork the repo**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Commit your changes** (`git commit -m 'Add new feature'`).
4. **Push to GitHub** (`git push origin feature-branch`).
5. **Create a Pull Request**.

## License
This project is open-source and available under the MIT License.

---

Happy coding! ⚽🎯


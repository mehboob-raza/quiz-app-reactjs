import { useState } from "react";
import { quizData } from "./quizData";
import "./quiz.css";
import { Box, Button, Typography } from "@mui/material";

const QuizApp = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quizData;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <Box
      className="quiz-container"
      sx={{
        maxWidth: "500px",
        minWidth: "250px",
        background: "#ffffff",
        borderRadius: "4px",
        marginTop: "100px",
        padding: "30px 60px",
      }}
    >
      {!showResult ? (
        <Box>
          <Box>
            <span
              style={{
                fontSize: "32px",
                fontWeight: "500",
                color: "#800080",
              }}
            >
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#e0dee3",
              }}
            >
              /{addLeadingZero(questions.length)}
            </span>
          </Box>
          <Typography variant="h4">{question}</Typography>
          <ul
            style={{
              marginTop: "20px",
              marginLeft: "-40px",
            }}
          >
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4">Result</Typography>
          <Typography>
            Total Question: <span>{questions.length}</span>
          </Typography>
          <Typography>
            Total Score:<span> {result.score}</span>
          </Typography>
          <Typography>
            Correct Answers:<span> {result.correctAnswers}</span>
          </Typography>
          <Typography>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default QuizApp;

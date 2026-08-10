import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getQuiz,
    submitQuiz
} from "../services/quizService";

const Quiz = () => {

    const { lessonId } = useParams();
    const { id } = useParams();

    const [quiz, setQuiz] = useState(null);

    const [questions, setQuestions] = useState([]);

    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [result, setResult] = useState(null);
    const navigate=useNavigate();
    const loadQuiz = async () => {

        try {

            const response =
                await getQuiz(id);

            setQuiz(response.data.quiz);

            setQuestions(response.data.questions);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadQuiz();

    }, []);
    const handleSelect = (
        questionId,
        option
    ) => {

        setAnswers(prev => {

            const filtered =
                prev.filter(
                    a => a.question_id !== questionId
                );

            return [
                ...filtered,
                {
                    question_id: questionId,
                    selected_option: option
                }
            ];

        });

    };
    const handleSubmit = async () => {

        try {

            const response =
                await submitQuiz({

                    quiz_id: quiz.id,

                    answers

                });

            setResult(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };
    if (loading) {

        return (

            <>

                <h2>Loading Quiz...</h2>

            </>

        );

    }
    return (
        <div className="quiz-container">

          <div className="quiz-header">

  <div>
  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
    <h1>📝 {quiz?.title}</h1>

    <p>
      Answer all questions carefully.
    </p>

  </div>

  <div className="quiz-info">

    <span>
      🎯 Passing Marks: {quiz?.passing_marks}
    </span>

    <span>
      ❓ {questions.length} Questions
    </span>

  </div>

</div>

            {/* <p>

                Passing Marks :

                {quiz?.passing_marks}%

            </p> */}
            {
                questions?.map((question, index) => (

                  <div className="question-card">

    <div className="question-number">

        Question {index + 1}

    </div>

    <h3>

        {question.question}

    </h3>

    <div className="options">

        <label>

            <input
                type="radio"
                name={question.id}
                onChange={() =>
                    handleSelect(question.id,1)
                }
            />

            {question.option1}

        </label>

        <label>

            <input
                type="radio"
                name={question.id}
                onChange={() =>
                    handleSelect(question.id,2)
                }
            />

            {question.option2}

        </label>

        <label>

            <input
                type="radio"
                name={question.id}
                onChange={() =>
                    handleSelect(question.id,3)
                }
            />

            {question.option3}

        </label>

        <label>

            <input
                type="radio"
                name={question.id}
                onChange={() =>
                    handleSelect(question.id,4)
                }
            />

            {question.option4}

        </label>

    </div>

</div>

                ))
            }<button
                className="submit-btn"
                onClick={handleSubmit}
            >

               🚀 Submit Quiz

            </button>
            {
result && (

<div className="quiz-result">

    <h2>

        {result.passed ? "🎉 Congratulations!" : "📚 Keep Practicing"}

    </h2>

    <h3>

        Score

        {result.score} / {result.totalQuestions}

    </h3>

    <h3>

        Percentage

        {result.percentage}%

    </h3>

    <div
        className={
            result.passed
                ? "pass-badge"
                : "fail-badge"
        }
    >

        {result.passed
            ? "✅ Passed"
            : "❌ Failed"}

    </div>

</div>

)
}
        </div>
    )
};
export default Quiz;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getQuiz,
    createQuiz,
    createQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion
} from "../services/quizService";
const QuizManagement = () => {

    const { lessonId } = useParams();

    const [quiz, setQuiz] = useState(null);

    const [title, setTitle] = useState("");

    const [passingMarks, setPassingMarks] = useState(60);

    const [loading, setLoading] = useState(true);

    const navigate=useNavigate();

    const [questions, setQuestions] = useState([]);

    const [question, setQuestion] = useState("");

    const [option1, setOption1] = useState("");

    const [option2, setOption2] = useState("");

    const [option3, setOption3] = useState("");

    const [option4, setOption4] = useState("");
const [editQuestion, setEditQuestion] = useState(null);
    const [correctOption, setCorrectOption] = useState(1);
    const loadQuestions = async () => {

        if (!quiz) return;

        try {

            const response =
                await getQuestions(quiz.id);

            setQuestions(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };
    const loadQuiz = async () => {

        try {

            const response =
                await getQuiz(lessonId);

            setQuiz(response.data.quiz);

            setTitle(response.data.quiz.title);

            setPassingMarks(
                response.data.quiz.passing_marks
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

  const handleEdit = (item) => {

  setEditQuestion(item);

  setQuestion(item.question);

  setOption1(item.option1);

  setOption2(item.option2);

  setOption3(item.option3);

  setOption4(item.option4);

  setCorrectOption(item.correct_option);

};
    const handleSave = async () => {

        try {

            await createQuiz({

                lesson_id: lessonId,

                title,

                passing_marks: passingMarks,

            });

            alert("Quiz Saved");

            loadQuiz();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed"
            );

        }

    };
    const handleSaveQuestion = async () => {
if (editQuestion) {

  await updateQuestion(
    editQuestion.id,
    {
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option: correctOption,
    }
  );

} else {

  await createQuestion({
    quiz_id: quiz.id,
    question,
    option1,
    option2,
    option3,
    option4,
    correct_option: correctOption,
  });

}
setEditQuestion(null);
 loadQuestions();

        // try {

        //     await createQuestion({

        //         quiz_id: quiz.id,

        //         question,

        //         option1,

        //         option2,

        //         option3,

        //         option4,

        //         correct_option: correctOption,

        //     });

        //     alert("Question Added");

        //     setQuestion("");

        //     setOption1("");

        //     setOption2("");

        //     setOption3("");

        //     setOption4("");

        //     setCorrectOption(1);

        //     loadQuestions();

        // } catch (error) {

        //     console.log(error);

        // }

    };
    const handleDelete = async (id) => {

  if (
    !window.confirm(
      "Delete this question?"
    )
  ) return;

  await deleteQuestion(id);

  loadQuestions();

};
     useEffect(() => {

        if (quiz) {

            loadQuestions();

        }

    }, [quiz]);
      useEffect(() => {

        loadQuiz();

    }, []);
    if (loading) {

        return (
            <>

                <h2>Loading...</h2>

            </>
        );

    }
   
    return (

        <>

         <div className="quiz-page">
  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
  <h1 className="page-title">
    📝 Quiz Management
  </h1>

  <div className="quiz-top">

    {/* Quiz Details */}

    <div className="admin-section">

      <h2>📘 Quiz Details</h2>
<br/>
      <div className="form-group">

        <label>Quiz Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter quiz title"
        />

      </div>
<br/>
      <div className="form-group">

        <label>Passing Marks (%)</label>

        <input
          type="number"
          value={passingMarks}
          onChange={(e) =>
            setPassingMarks(e.target.value)
          }
        />

      </div>
<br/>
      <button
        className="primary-btn"
        onClick={handleSave}
      >
        💾 Save Quiz
      </button>

    </div>

    {/* Add Question */}

    <div className="admin-section">

      <h2>➕ Add Question</h2>

      <div className="form-group">

        <label>Question</label>

        <input
          placeholder="Enter Question"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

      </div>

      <div className="form-group">
<br/>
        <label>Option 1</label>

        <input
          placeholder="Option 1"
          value={option1}
          onChange={(e) =>
            setOption1(e.target.value)
          }
        />

      </div>

      <div className="form-group">
<br/>
        <label>Option 2</label>

        <input
          placeholder="Option 2"
          value={option2}
          onChange={(e) =>
            setOption2(e.target.value)
          }
        />

      </div>

      <div className="form-group">
<br/>
        <label>Option 3</label>

        <input
          placeholder="Option 3"
          value={option3}
          onChange={(e) =>
            setOption3(e.target.value)
          }
        />

      </div>

      <div className="form-group">
<br/>
        <label>Option 4</label>

        <input
          placeholder="Option 4"
          value={option4}
          onChange={(e) =>
            setOption4(e.target.value)
          }
        />

      </div>

      <div className="form-group">
<br/>
        <label>Correct Option</label>

        <select
          value={correctOption}
          onChange={(e) =>
            setCorrectOption(
              Number(e.target.value)
            )
          }
        >
<br/>
          <option value={1}>
            Option 1
          </option>
<br/>
          <option value={2}>
            Option 2
          </option>

          <option value={3}>
            Option 3
          </option>

          <option value={4}>
            Option 4
          </option>

        </select>

      </div>
<br/>
      <button
        className="primary-btn"
        onClick={handleSaveQuestion}
      >
        ➕ Save Question
      </button>

    </div>

  </div>

  {/* Questions */}

  <div className="admin-section">

    <h2>
      📋 Question Bank
    </h2>

    {
      questions.length === 0 ? (

        <p>
          No questions added yet.
        </p>

      ) : (

        questions.map((item, index) => (

          <div
            key={item.id}
            className="question-card"
          >

            <div className="question-header">

              <h3>

                Question {index + 1} {item.question}

              </h3>

            </div>

          <br/>
            <div className="options-list">

              <p>

                {item.correct_option === 1 ? "✅" : "⚪"}

                {item.option1}

              </p>

              <p>

                {item.correct_option === 2 ? "✅" : "⚪"}

                {item.option2}

              </p>

              <p>

                {item.correct_option === 3 ? "✅" : "⚪"}

                {item.option3}

              </p>

              <p>

                {item.correct_option === 4 ? "✅" : "⚪"}

                {item.option4}

              </p>

            </div>
<br/>
            <div className="question-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  handleEdit(item)
                }
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))

      )
    }

  </div>

</div>
        </>

    );

};

export default QuizManagement;
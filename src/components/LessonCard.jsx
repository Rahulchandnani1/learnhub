import { useNavigate } from "react-router-dom";

const LessonCard = ({
  lesson,
  onEdit,
  onDelete,
  onManageQuiz
}) => {
    const navigate=useNavigate();
      const user = JSON.parse(localStorage.getItem("user"));

  return (
   <div className="lesson-card">

  <div className="lesson-header">

    <div className="lesson-number">
      {lesson.lesson_order}
    </div>

    <div>

      <h3>{lesson.title}</h3>

      <p>{lesson.description}</p>

    </div>

  </div>

  <div className="lesson-meta">

    <span>⏱ {lesson.duration}</span>

    {lesson.has_quiz && (
      <span className="quiz-badge">
        📝 Quiz
      </span>
    )}

    {lesson.completed && (
      <span className="completed-badge">
        ✅ Completed
      </span>
    )}

  </div>

  <div className="course-actions">

    <button
      className="primary-btn"
      onClick={() =>
        navigate(`/lesson/${lesson.id}`)
      }
    >
      ▶ Open Lesson
    </button>

    {lesson.has_quiz && (
      <button
        className="secondary-btn"
        onClick={() =>
          navigate(`/quiz/${lesson.id}`)
        }
      >
        Take Quiz
      </button>
    )}

    {user?.role === "Admin" && (
      <>
        <button
          className="edit-btn"
          onClick={() => onEdit(lesson)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(lesson.id)}
        >
          🗑 Delete
        </button>

        <button
          className="primary-btn"
          onClick={() => onManageQuiz(lesson)}
        >
          📝 Manage Quiz
        </button>
      </>
    )}

  </div>

</div>
  );
};
export default LessonCard;
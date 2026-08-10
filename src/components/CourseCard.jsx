import "../styles/CourseCard.css";
import { useNavigate } from "react-router-dom";
const CourseCard = ({
  course,
  onEnroll,
  onEdit,
  onDelete,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h2>{course.title}</h2>
      </div>

      <div className="course-card-body">
        <p>{course.description}</p>

        <div className="course-price">
          ₹ {course.price}
        </div>
      </div>
      <div className="course-actions">

  <button
    className="enroll-btn"
    onClick={() => navigate(`/courses/${course.id}`)}
  >
    View Details
  </button>

  <button
    className="enroll-btn"
    onClick={() => navigate(`/courses/${course.id}/lessons`)}
  >
    Lessons
  </button>

</div>
{/* <button  className="enroll-btn"
  onClick={() => navigate(`/courses/${course.id}`)}
>
  View Details
</button>
<button  className="enroll-btn"
    onClick={() =>
        navigate(
            `/courses/${course.id}/lessons`
        )
    }
>
    Lessons
</button> */}
      <div className="course-card-footer">
        {user.role === "Admin" ? (
          <>
            <button
              className="edit-btn"
              onClick={() => onEdit(course)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(course.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className="enroll-btn"
            onClick={() => onEnroll(course.id)}
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
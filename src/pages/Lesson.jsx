import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import LessonCard from "../components/LessonCard";
import LessonForm from "../components/LessonForm";

import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../services/lessonService";

const Lessons = () => {

  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [editLesson, setEditLesson] = useState(null);
  const user = JSON.parse(
  localStorage.getItem("user")
);
const navigate = useNavigate();
  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {

    try {

      setLoading(true);

      const response =
        await getLessons(courseId);

      setLessons(response.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit = async (data) => {

    try {

      if (editLesson) {

        await updateLesson(
          editLesson.id,
          data
        );

        alert("Lesson Updated");

      } else {

        await createLesson(data);

        alert("Lesson Created");

      }

      setOpen(false);

      setEditLesson(null);

      loadLessons();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this lesson?"
      );

    if (!confirmDelete) return;

    try {

      await deleteLesson(id);

      alert("Lesson Deleted");

      loadLessons();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
 <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
    
    <div className="page-header">
      

    <div>

        <h1>📖 Course Lessons</h1>

        <p>

            Complete every lesson to unlock your certificate.

        </p>

    </div>

    {
        user?.role === "Admin" && (

            <button
                className="primary-btn"
                onClick={() => {

                    setEditLesson(null);

                    setOpen(true);

                }}
            >

                + Create Lesson

            </button>

        )
    }

</div>
        {
!loading && lessons.length===0 && (

<div className="empty-state">

📚

<h2>

No lessons available.

</h2>

</div>

)
}

      

      

      {
        loading ?

        <p>Loading...</p>

        :

        <div className="course-grid">

          {

            lessons.map((lesson) => (

              <LessonCard

                key={lesson.id}

                lesson={lesson}

                onEdit={(lesson) => {

                  setEditLesson(lesson);

                  setOpen(true);

                }}

                onDelete={handleDelete}
                 onManageQuiz={(lesson) =>
    navigate(`/lessons/${lesson.id}/quiz`)
  }


              />

            ))

          }

        </div>

      }

      <LessonForm

        open={open}

        onClose={() => setOpen(false)}

        onSubmit={handleSubmit}

        editLesson={editLesson}

        courseId={courseId}

      />

    </>
  );

};

export default Lessons;
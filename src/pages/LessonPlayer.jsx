import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getLessonById } from "../services/lessonService";
import {
  markLessonCompleted,
  checkLessonCompleted,
} from "../services/progressService";
const LessonPlayer = () => {

  const { id } = useParams();

  const [lesson, setLesson] = useState(null);

  const [loading, setLoading] = useState(true);
const [completed, setCompleted] = useState(false);
const navigate=useNavigate();
const [progressSaved, setProgressSaved] =
  useState(false);
const saveProgress = async () => {

  if (progressSaved) return;

  try {

    await markLessonCompleted(id);

    setCompleted(true);

    setProgressSaved(true);

  } catch (error) {

    console.log(error);

  }

};
const loadCompletion = async () => {
  try {

    const response =
      await checkLessonCompleted(id);

    setCompleted(response.data.completed);

  } catch (error) {

    console.log(error);

  }
};
  const loadLesson = async () => {
    try {

      const response =
        await getLessonById(id);

      setLesson(response.data.lesson);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };
useEffect(() => {
  loadLesson();
  loadCompletion();
}, [id]);
  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>

      <div className="lesson-player">
  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
        <h1>{lesson.title}</h1>

        <p>{lesson.description}</p>

        {/* Video */}

        <div className="video-box">

         <video
  controls
  width="100%"
  onTimeUpdate={(e) => {

    const video = e.target;

    if (
      video.currentTime / video.duration >= 0.9
    ) {
      saveProgress();
    }

  }}
>

  <source
    src={lesson.video_url}
    type="video/mp4"
  />

</video>

        </div>

        {/* PDF */}

        {lesson.pdf_url && (

          <div className="pdf-section">

            <h2>Lesson Notes</h2>

            <a
              href={lesson.pdf_url}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>

          </div>

        )}

{completed ? (
  <button disabled>
    ✔ Completed
  </button>
) : (
  <button onClick={saveProgress}>
    Mark as Completed
  </button>
)}
      </div>

    </>
  );
};

export default LessonPlayer;
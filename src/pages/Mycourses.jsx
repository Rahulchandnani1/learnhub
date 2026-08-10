import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMyCourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";
import { downloadCertificate } from "../services/certificateService";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    try {
      setLoading(true);

      const response = await getMyCourses();

      setCourses(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };
const handleDownloadCertificate = async (course) => {

  try {

    const response =
      await downloadCertificate(course.id);

    const url =
      window.URL.createObjectURL(response.data);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${course.title}-Certificate.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Unable to download certificate"
    );

  }

};

  return (
    <>
    <div className="page-header">

    <div>

        <h1>📚 My Courses</h1>

        <p>
            Continue where you left off
        </p>

    </div>

</div>

      {loading ? (
        <p>Loading...</p>
      ) : courses?.length === 0 ? (
        <p>No enrolled courses found.</p>
      ) : (
       <div className="my-course-grid">

{

courses.map((course)=>(

<div
key={course.id}
className="my-course-card"
>

<img

src={
course.thumbnail ||
"https://via.placeholder.com/400x220"
}

alt={course.title}

/>

<div className="course-content">

<h2>

{course.title}

</h2>

<p>

{course.description}

</p>

<div className="course-meta">

<span>
Enrolled on:
📅 {
new Date(
course.enrolled_at
).toLocaleDateString()
}

</span>

</div>
<div className="progress-bar">

    <div
        className="progress-fill"
        style={{
            width: `${course.progress}%`
        }}
    ></div>

</div>

<p>{course.progress}% Completed</p>
<div className="course-actions">

<button
        className="primary-btn"
        onClick={() =>
            navigate(`/courses/${course.id}/lessons`)
        }
    >
        Continue Learning
    </button>

    {course.completed && (

        <button
            className="secondary-btn"
            onClick={() =>
                handleDownloadCertificate(course)
            }
        >
            🏆 Download Certificate
        </button>

    )}

</div>

</div>

</div>

))

}

</div>
      )}
    </>
  );
};

export default MyCourses;
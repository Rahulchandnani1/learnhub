import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CourseTable from "../components/CourseTable";
import { getCourses ,  createCourse, updateCourse,
  deleteCourse,enrollCourse} from "../services/courseService";
import CourseForm from "../components/CourseForm";
import "../styles/dashboard.css";
import CourseCard from "../components/CourseCard";
const Courses = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

const [search, setSearch] = useState("");

const [page, setPage] = useState(1);

const [totalPages, setTotalPages] = useState(1);
const [open, setOpen] = useState(false);
const [editCourse, setEditCourse] = useState(null);
const user = JSON.parse(localStorage.getItem("user"));
 const loadCourses = async () => {
  try {

    setLoading(true);

    const response = await getCourses({
      page,
      limit: 5,
      search,
    });

    setCourses(response.data.data);

    setTotalPages(response.data.totalPages);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
const handleSubmit = async (data) => {
  try {
    if (editCourse) {
      await updateCourse(editCourse.id, data);

      alert("Course Updated Successfully");
    } else {
      await createCourse(data);

      alert("Course Created Successfully");
    }

    loadCourses();

    setOpen(false);

    setEditCourse(null);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }
};
const handleEnroll = async (courseId) => {
  try {
    await enrollCourse(courseId);

    alert("Enrolled Successfully");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Enrollment Failed"
    );
  }
};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {

    await deleteCourse(id);

    alert("Course Deleted Successfully");

    loadCourses();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );

  }

};
  useEffect(() => {

    loadCourses();

  }, [page,search]);

  return (

    <>

      <div className="page-header">

       <div className="page-header">

  <div>

    <h1>📚 Explore Courses</h1>

    <p>
      Discover new skills and continue your learning journey.
    </p>

  </div>

  {user?.role === "Admin" && (

    <button
      className="primary-btn"
      onClick={() => {
        setEditCourse(null);
        setOpen(true);
      }}
    >
      + Create Course
    </button>

  )}

</div>
      </div>

   <div className="search-wrapper">

  <input
    className="search-input"
    placeholder="🔍 Search courses..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
  />

</div>
{
loading ?

<p>Loading Courses...</p>

:

<div className="course-grid">
  {courses.map((course) => (
    <CourseCard
      key={course.id}
      course={course}
      onEdit={(course) => {
        setEditCourse(course);
        setOpen(true);
      }}
      onDelete={handleDelete}
      onEnroll={handleEnroll}
    />
  ))}
</div>
}

     
    <div className="pagination">

<button
disabled={page===1}
onClick={() => setPage(page-1)}
>
← Previous
</button>

<span>

Page {page} of {totalPages}

</span>

<button
disabled={page===totalPages}
onClick={() => setPage(page+1)}
>
Next →
</button>

</div>
<CourseForm
  open={open}
  onClose={() => setOpen(false)}
  onSubmit={handleSubmit}
  editCourse={editCourse}
/>
    </>

  );

};

export default Courses;
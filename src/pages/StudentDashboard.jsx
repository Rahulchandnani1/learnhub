import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getContinueLearning,
  getRecommendedCourses,
  getCategories,
  getCoursesByCategory,
  getDashboardStats,
  searchCourses,
  getPopularCourses,
} from "../services/dashboardService";
import "../styles/StudentDashboard.css";
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [popularCourses, setPopularCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryCourses, setCategoryCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const loadRecommendedCourses = async () => {
    try {
      const response = await getRecommendedCourses();

      setRecommendedCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadPopularCourses = async () => {
    try {
      const response = await getPopularCourses();

      setPopularCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSearchResult([]);

      return;
    }

    try {
      const response = await searchCourses(value);

      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadDashboard = async () => {
    try {
      const response = await getContinueLearning();

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      const response = await getCoursesByCategory(category);

      setCategoryCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadStats = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDashboard();

    loadCategories();

    loadRecommendedCourses();

    loadStats();

    loadPopularCourses();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="hero-section">
        <div>
          <h1>
            👋 Welcome back, {user.name}
          </h1>
<br/>
          <p>Continue learning and achieve your goals.</p>
        </div>
      </div>
      <br />
      <div className="student-stats">
        <div className="student-stat-card">
          <div className="stat-icon">📚</div>

          <h2>{stats.enrolledCourses}</h2>

          <p>My Courses</p>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🎓</div>

          <h2>{stats.completedLessons}</h2>

          <p>Lessons Completed</p>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🏆</div>

          <h2>{stats.certificates}</h2>

          <p>Certificates</p>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🎯</div>

          <h2>{stats.averageProgress}%</h2>

          <p>Progress</p>
        </div>
      </div>

     <h2 className="section-title">
    📖 Continue Learning
</h2>

<div className="continue-grid">

{
courses.length === 0 ? (

<p>No enrolled courses yet.</p>

) : (

courses.map((course)=>(

<div
key={course.id}
className="continue-card"
>

<img
src={
course.thumbnail ||
"https://placehold.co/600x350?text=Course"
}
alt={course.title}
/>

<div className="continue-content">

<h3>

{course.title}

</h3>

<div className="progress-bar">

<div
className="progress-fill"
style={{
width:`${course.progress}%`
}}
></div>

</div>

<p>

{course.progress}% Completed

</p>

<button
className="primary-btn"
onClick={()=>
navigate(`/courses/${course.id}/lessons`)
}
>

▶ Continue Learning

</button>

</div>

</div>

))

)

}

</div>
      <h2 className="section-title">Browse Categories</h2>

      <div className="category-list">
        {categories.map((item) => (
          <button
            key={item.category}
            className={
              selectedCategory === item.category
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => handleCategoryClick(item.category)}
          >
            {item.category} ({item.total_courses})
          </button>
        ))}
      </div>
      {categoryCourses.length > 0 && (
        <div className="course-grid">
          {categoryCourses.map((course) => (
            <div key={course.id} className="dashboard-card">
              <img
                src={course.thumbnail || "https://via.placeholder.com/300x180"}
                alt={course.title}
              />

              <div className="card-body">
                <h3>{course.title}</h3>

                <p>{course.instructor}</p>

                <h4>₹ {course.price}</h4>

                <button
                  className="primary-btn"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 className="section-title">Recommended For You</h2>

      <div className="course-grid">
        {recommendedCourses.map((course) => (
          <div key={course.id} className="dashboard-card">
            <img
              src={course.thumbnail || "https://via.placeholder.com/300x180"}
              alt={course.title}
            />

            <div className="card-body">
              <span className="category-tag">{course.category}</span>

              <h3>{course.title}</h3>

              <p>{course.instructor}</p>

              <h4>₹ {course.price}</h4>

              <button
                className="primary-btn"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="section-title">🔥 Popular Courses</h2>

      <div className="course-grid">
        {popularCourses.map((course, index) => (
          <div key={course.id} className="dashboard-card">
            {index < 3 && <span className="best-seller">Best Seller</span>}

            <img
              src={course.thumbnail || "https://via.placeholder.com/300x180"}
              alt={course.title}
            />

            <div className="card-body">
              <span className="category-tag">{course.category}</span>

              <h3>{course.title}</h3>

              <p>{course.instructor}</p>

              <p>⭐ {course.average_rating}</p>

              <p>👥 {course.total_enrollments} Students</p>

              <h4>₹ {course.price}</h4>

              <button
                className="primary-btn"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

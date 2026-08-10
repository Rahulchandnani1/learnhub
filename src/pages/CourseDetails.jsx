import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    getCourseById,
    enrollCourse,
} from "../services/courseService";
import "../styles/CourseDetails.css";
import { getCourseProgress } from "../services/progressService";
import { getLessons } from "../services/lessonService";
import {
    getCourseReviews,
    addReview,
} from "../services/reviewService";
import { downloadCertificate } from "../services/certificateService";
const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    const [totalReviews, setTotalReviews] = useState(0);

    const [rating, setRating] = useState(5);

    const [review, setReview] = useState("");
    const loadProgress = async () => {
        try {
            const response =
                await getCourseProgress(id);

            setProgress(response.data.progress);

        } catch (error) {
            console.log(error);
        }
    };
const handleDownloadCertificate = async () => {

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
    const loadReviews = async () => {
        try {

            const response =
                await getCourseReviews(id);

            setReviews(response.data.reviews);

            setAverageRating(
                response.data.averageRating
            );

            setTotalReviews(
                response.data.totalReviews
            );

        } catch (error) {

            console.log(error);

        }
    };
    const handleReview = async () => {

        try {

            await addReview({
                course_id: id,
                rating,
                review,
            });

            alert("Review Saved");

            setReview("");

            setRating(5);

            loadReviews();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed"
            );

        }

    };
    const loadCourse = async () => {
        try {
            const response = await getCourseById(id);

            setCourse(response.data.data);
        } catch (error) {
            console.log(error);
            alert("Unable to load course.");
        } finally {
            setLoading(false);
        }
    };
    const loadLessons = async () => {
        try {
            const response = await getLessons(id);

            setLessons(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };
    const handleEnroll = async () => {
        try {
            await enrollCourse(course.id);

            alert("Course Enrolled Successfully");
            setCourse({
                ...course,
                isEnrolled: true,
            });
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Enrollment Failed"
            );
        }
    };
    useEffect(() => {
        loadCourse();
        loadLessons();
        loadProgress();
        loadReviews();
    }, []);
    if (loading) {
        return (
            <h2>Loading...</h2>
        );
    }

    if (!course) {
        return (
            <h2>Course Not Found</h2>
        );
    }

    //  useEffect(() => {
    //     loadCourse();
    //   }, [id]);
    return (
        <div className="course-details">

            <button
                className="back-btn"
                onClick={() => navigate("/courses")}
            >
                ← Back to Courses
            </button>

            <img
                src={
                    course.thumbnail ||
                    "https://via.placeholder.com/1200x400"
                }
                alt={course.title}
                className="course-banner"
            />

            <div className="course-top">

                <div className="course-left">

                    <h1>{course.title}</h1>

                    <p className="description">
                        {course.description}
                    </p>


                    <div className="rating">
                        ⭐ {averageRating}
                        
                        ({totalReviews} Reviews)
                    </div>
                    <div className="review-box">

                        <h2>Write a Review</h2>

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(Number(e.target.value))
                            }
                        >

                            <option value={5}>★★★★★</option>

                            <option value={4}>★★★★☆</option>

                            <option value={3}>★★★☆☆</option>

                            <option value={2}>★★☆☆☆</option>

                            <option value={1}>★☆☆☆☆</option>

                        </select>

                        <textarea
                            rows="4"
                            placeholder="Write your review..."

                            value={review}

                            onChange={(e) =>
                                setReview(e.target.value)
                            }
                        />

                        <button
                            className="primary-btn"
                            onClick={handleReview}
                        >

                            Submit Review

                        </button>

                    </div>
                    <div className="reviews-section">

                        <h2>

                            Student Reviews

                        </h2>

                        {
                            reviews.map((item) => (

                                <div
                                    className="review-card"
                                    key={item.id}
                                >

                                    <h3>

                                        {item.name}

                                    </h3>

                                    <p>

                                        {"⭐".repeat(item.rating)}

                                    </p>

                                    <p>

                                        {item.review}

                                    </p>

                                    <small>

                                        {
                                            new Date(
                                                item.created_at
                                            ).toLocaleDateString()
                                        }

                                    </small>

                                </div>

                            ))
                        }

                    </div>
                    <h3>Course Progress</h3>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                    <p>{progress}% Completed</p>

                    <br />
                    {Number(progress) === 100 && (
  <button
    className="primary-btn"
    onClick={handleDownloadCertificate}
  >
    Download Certificate
  </button>
)}
<br/>
<br/>
                    <div className="course-info">

                        <div>
                            👨 <strong>Instructor</strong>
                            <br />
                            {course.instructor}
                        </div>

                        <div>
                            📚 <strong>Category</strong>
                            <br />
                            {course.category}
                        </div>

                        <div>
                            📈 <strong>Level</strong>
                            <br />
                            {course.level}
                        </div>

                        <div>
                            🌐 <strong>Language</strong>
                            <br />
                            {course.language}
                        </div>

                        <div>
                            ⏱ <strong>Duration</strong>
                            <br />
                            {course.duration}
                        </div>

                        <div>
                            🎥 <strong>Lessons</strong>
                            <br />
                            {course.total_lessons}
                        </div>

                    </div>

                </div>

                <div className="price-card">

                    <h2>₹ {course.price}</h2>

                    {/* <button
              className="enroll-btn"
              onClick={handleEnroll}
            >
              Enroll Now
            </button> */}
                    {
                        course.isEnrolled ? (

                            <button
                                className="enroll-btn"
                                onClick={() =>
                                    navigate(`/courses/${course.id}/lessons`)
                                }
                            >
                                View Course
                            </button>

                        ) : (

                            <button
                                className="enroll-btn"
                                onClick={handleEnroll}
                            >
                                Enroll Now
                            </button>

                        )
                    }
                    <ul>
                        <li>✔ Lifetime Access</li>
                        <li>✔ Downloadable Resources</li>
                        <li>✔ Practice Assignments</li>
                        <li>✔ Certificate of Completion</li>
                        <li>✔ Mobile & Desktop Access</li>
                    </ul>

                </div>

            </div>

            <div className="section">

                <h2>What You'll Learn</h2>

                <div className="learn-grid">

                    <div>✔ React Components</div>
                    <div>✔ React Hooks</div>
                    <div>✔ React Router</div>
                    <div>✔ API Integration</div>
                    <div>✔ State Management</div>
                    <div>✔ Authentication</div>
                    <div>✔ Performance Optimization</div>
                    <div>✔ Project Deployment</div>

                </div>

            </div>

            <div className="section">

                <h2>Course Includes</h2>

                <ul className="includes">

                    <li>🎥 {course.total_lessons} Video Lessons</li>

                    <li>📄 Downloadable Notes</li>

                    <li>💻 Coding Exercises</li>

                    <li>📝 Practice Projects</li>

                    <li>🏆 Completion Certificate</li>

                    <li>♾ Lifetime Access</li>

                </ul>

            </div>

        </div>
    );
};

export default CourseDetails;
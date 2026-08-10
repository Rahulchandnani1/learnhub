import { useState, useEffect } from "react";
import "../styles/CourseForm.css";

const CourseForm = ({
  open,
  onClose,
  onSubmit,
  editCourse,
}) => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    instructor: "",
    category: "",
    level: "Beginner",
    language: "English",
    duration: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [thumbnail, setThumbnail] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editCourse) {
      setFormData({
        title: editCourse.title || "",
        description: editCourse.description || "",
        price: editCourse.price || "",
        instructor: editCourse.instructor || "",
        category: editCourse.category || "",
        level: editCourse.level || "Beginner",
        language: editCourse.language || "English",
        duration: editCourse.duration || "",
      });

      if (editCourse.thumbnail) {
        setPreview(
          `http://localhost:5000/uploads/thumbnails/${editCourse.thumbnail}`
        );
      } else {
        setPreview("");
      }

      setThumbnail(null);

    } else {
      setFormData(initialState);
      setThumbnail(null);
      setPreview("");
    }
  }, [editCourse, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Course title is required");
    }

    if (!formData.description.trim()) {
      return alert("Description is required");
    }

    if (!formData.price) {
      return alert("Price is required");
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("instructor", formData.instructor);
    data.append("category", formData.category);
    data.append("level", formData.level);
    data.append("language", formData.language);
    data.append("duration", formData.duration);

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    onSubmit(data);
  };

  if (!open) return null;

  return (
   <div className="modal-overlay">

  <div className="course-modal">

    <div className="modal-header">

      <div>

        <h2>
          {editCourse ? "✏ Update Course" : "📚 Create New Course"}
        </h2>

        <p>
          Fill in the course information below.
        </p>

      </div>

      <button
        className="close-btn"
        onClick={onClose}
      >
        ✕
      </button>

    </div>

    <form onSubmit={handleSubmit}>

      <div className="form-grid">

        <div className="form-group">

          <label>
            📖 Course Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="React Complete Bootcamp"
          />

        </div>

        <div className="form-group">

          <label>
            👨‍🏫 Instructor
          </label>

          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="John Doe"
          />

        </div>

        <div className="form-group full-width">

          <label>
            📝 Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn..."
          />

        </div>

        <div className="form-group">

          <label>
            💰 Price (₹)
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="999"
          />

        </div>

        <div className="form-group">

          <label>
            🏷 Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Frontend Development"
          />

        </div>

        <div className="form-group">

          <label>
            📈 Level
          </label>

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
          >

            <option>Beginner</option>

            <option>Intermediate</option>

            <option>Advanced</option>

          </select>

        </div>

        <div className="form-group">

          <label>
            🌐 Language
          </label>

          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="English"
          />

        </div>

        <div className="form-group">

          <label>
            ⏱ Duration
          </label>

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="24 Hours"
          />

        </div>

        <div className="form-group full-width">

          <label>
            🖼 Course Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

        </div>

      </div>

      {preview && (

        <div className="thumbnail-preview">

          <h4>
            Thumbnail Preview
          </h4>

          <img
            src={preview}
            alt="Course Thumbnail"
          />

        </div>

      )}

      <div className="modal-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
        >
          {editCourse
            ? "💾 Update Course"
            : "🚀 Publish Course"}
        </button>

      </div>

    </form>

  </div>

</div>
  );
};

export default CourseForm;
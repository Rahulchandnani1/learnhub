import { useEffect, useState } from "react";

const LessonForm = ({
  open,
  onClose,
  onSubmit,
  editLesson,
  courseId,
}) => {
  const initialState = {
    title: "",
    description: "",
    video_url: "",
    pdf_url: "",
    duration: "",
    lesson_order: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editLesson) {
      setFormData(editLesson);
    } else {
      setFormData(initialState);
    }
  }, [editLesson, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      course_id: courseId,
    });
  };

  if (!open) return null;

  return (
  <div className="modal-overlay">

  <div className="course-modal">

    <div className="modal-header">

      <div>

        <h2>

          {editLesson
            ? "✏ Update Lesson"
            : "🎥 Create New Lesson"}

        </h2>

        <p>

          Add lesson details for your course.

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

        <div className="form-group full-width">

          <label>

            📖 Lesson Title

          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Introduction to React"
          />

        </div>

        <div className="form-group full-width">

          <label>

            📝 Lesson Description

          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain what students will learn..."
          />

        </div>

        <div className="form-group full-width">

          <label>

            🎬 Video URL

          </label>

          <input
            type="text"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />

        </div>

        <div className="form-group full-width">

          <label>

            📄 PDF URL

          </label>

          <input
            type="text"
            name="pdf_url"
            value={formData.pdf_url}
            onChange={handleChange}
            placeholder="https://example.com/notes.pdf"
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
            placeholder="25 Minutes"
          />

        </div>

        <div className="form-group">

          <label>

            🔢 Lesson Order

          </label>

          <input
            type="number"
            name="lesson_order"
            value={formData.lesson_order}
            onChange={handleChange}
            placeholder="1"
          />

        </div>

      </div>

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
          {editLesson
            ? "💾 Update Lesson"
            : "🚀 Create Lesson"}
        </button>

      </div>

    </form>

  </div>

</div>
  );
};

export default LessonForm;
const CourseTable = ({
  courses,
  onEdit,
  onDelete,
  onEnroll
}) => {
const user = JSON.parse(localStorage.getItem("user"));
  return (

    <table className="table">

      <thead>

        <tr>

          <th>Title</th>

          <th>Category</th>

          <th>Price</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {courses.length === 0 ? (

          <tr>

            <td colSpan="4">
              No Courses Found
            </td>

          </tr>

        ) : (

          courses.map((course) => (

            <tr key={course.id}>

              <td>{course.title}</td>

              <td>{course.category}</td>

              <td>₹{course.price}</td>

              <td>
{user.role === "Admin" ? (
  <>
    <button className="edit-btn" onClick={() => onEdit(course)}>Edit</button>
    <button className="delete-btn" onClick={() => onDelete(course.id)}>Delete</button>
  </>
) : (
  <button className="edit-btn" onClick={() => onEnroll(course.id)}>
    Enroll
  </button>
)}
             

  

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  );

};

export default CourseTable;
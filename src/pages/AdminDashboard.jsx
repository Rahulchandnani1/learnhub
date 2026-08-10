import {useEffect,useState} from "react";

import {
getAdminStats
,getMonthlyUsers,getPopularCourses,getMonthlyEnrollments
}
from "../services/adminDashboardService";
import "../styles/Dashboard.css";
import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

Title,

Tooltip,

Legend

}
from "chart.js";

import {

Bar

}
from "react-chartjs-2";

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

Title,

Tooltip,

Legend

);
const AdminDashboard=()=>{
const [monthlyUsers,setMonthlyUsers]=
useState([]);
const [stats,setStats]=useState({});
const [popularCourses, setPopularCourses] = useState([]);
const [monthlyEnrollments, setMonthlyEnrollments] =
  useState([]);
  const loadMonthlyEnrollments = async () => {

  try {

    const response =
      await getMonthlyEnrollments();

    setMonthlyEnrollments(response.data.data);

  } catch (error) {

    console.log(error);

  }

};
const loadStats=async()=>{

const response=
await getAdminStats();

setStats(response.data.data);

};
const loadMonthlyUsers=async()=>{

const response=
await getMonthlyUsers();

setMonthlyUsers(
response.data.data
);

};

const loadPopularCourses = async () => {

  try {

    const response =
      await getPopularCourses();

    setPopularCourses(response.data.data);

  } catch (error) {

    console.log(error);

  }

};
const chartData={

labels:

monthlyUsers.map(

item=>item.month

),

datasets:[

{

label:"Users",

data:

monthlyUsers.map(

item=>item.users

)

}

]

};
const enrollmentChartData = {

  labels:
    monthlyEnrollments.map(item => item.month),

  datasets: [

    {

      label: "Enrollments",

      data:
        monthlyEnrollments.map(
          item => item.enrollments
        )

    }

  ]

};
useEffect(()=>{

loadStats();
loadPopularCourses();
loadMonthlyUsers();
loadMonthlyEnrollments();
},[]);

return(

<div className="admin-dashboard">

<div className="dashboard-header">

    <div>

        <h1>📊 Admin Dashboard</h1>

        <p>
            Monitor users, courses and platform activity
        </p>

    </div>

    {/* <div className="dashboard-actions">

        <button className="primary-btn">
            Export Report
        </button>

    </div> */}

</div>

<div className="stats-grid">

<div className="stat-card">

<h2>{stats.users}</h2>

<p>👥 Total Users</p>

</div>

<div className="stat-card">

<h2>{stats.courses}</h2>

<p>📚  Total Courses</p>

</div>

<div className="stat-card">

<h2>{stats.enrollments}</h2>

<p>🎓 Enrollments</p>

</div>

<div className="stat-card">

<h2>{stats.lessons}</h2>

<p>📄 Lessons</p>

</div>

<div className="stat-card">

<h2>{stats.quizzes}</h2>

<p>❓ Quizzes</p>

</div>

<div className="stat-card">

<h2>{stats.certificates}</h2>

<p>🏆 Certificates</p>

</div>

<div className="stat-card">

<h2>{stats.reviews}</h2>

<p>⭐ Reviews</p>

</div>

</div>
<div className="charts-grid">

<div className="chart-card">

<h3>

Monthly Registrations

</h3>

<Bar data={chartData}/>

</div>

<div className="chart-card">

<h3>

Monthly Enrollments

</h3>

<Bar
data={enrollmentChartData}
/>

</div>

</div>
<br/>
<br/>
<div className="table-card">
<h2 className="section-title">
  🔥 Top Popular Courses
</h2>

<table className="admin-table">

  <thead>

    <tr>

      <th>Course</th>

      <th>Instructor</th>

      <th>Enrollments</th>

      <th>Rating</th>

    </tr>

  </thead>

  <tbody>

    {
      popularCourses.map((course) => (

        <tr key={course.id}>

          <td>{course.title}</td>

          <td>{course.instructor}</td>

          <td>{course.enrollments}</td>

          <td>⭐ {course.rating}</td>

        </tr>

      ))
    }

  </tbody>

</table>

</div>
</div>

);

};

export default AdminDashboard;
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/AdminDashboard";
import Users from "../pages/User";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyResetOTP from "../pages/VerifyResetOTP";
import ResetPassword from "../pages/ResetPassword";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import VerifyOTP from "../pages/verifyOtp";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MyCourses from "../pages/Mycourses";
import CourseDetails from "../pages/CourseDetails";
import Lessons from "../pages/Lesson";
import LessonPlayer from "../pages/LessonPlayer";
import Quiz from "../pages/Quiz";
import QuizManagement from "../pages/QuizManagement";
import StudentDashboard from "../pages/StudentDashboard";
export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<AuthLayout />}>

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />
<Route
                    path="/verify-otp"
                    element={<VerifyOTP />}
                />
                </Route>
                
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
<Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
<Route
    path="/courses/:courseId/lessons"
    element={
        <ProtectedRoute>
            <Lessons />
        </ProtectedRoute>
    }
/>

<Route
  path="/lesson/:id"
  element={
    <ProtectedRoute>
      <LessonPlayer />
    </ProtectedRoute>
  }
/>
<Route
    path="/quiz/:id"
    element={
        <ProtectedRoute>
            <Quiz />
        </ProtectedRoute>
    }
/>
<Route
  path="/lessons/:lessonId/quiz"
  element={
    <ProtectedRoute>
      <QuizManagement />
    </ProtectedRoute>
  }
/>
                   <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>
  }
/>
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
                    <Route
                        path="/users"
                        element={<Users />}
                    />
 
                    <Route
                        path="/courses"
                        element={<Courses />}
                    />
                    <Route
  path="/courses/:id"
  element={
    <ProtectedRoute>
      <CourseDetails />
    </ProtectedRoute>
  }
/>
                    <Route
  path="/my-courses"
  element={
    // <ProtectedRoute>
      <MyCourses />
    // </ProtectedRoute>
  }
/>

                    <Route
                        path="/profile"
                        element={<Profile />}
                    /> 

                </Route>

            </Routes>

        </BrowserRouter>
    );
}
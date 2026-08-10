import api from "./api";

export const getAdminStats = () =>
api.get("/admin/dashboard/stats");
export const getPopularCourses = () =>
  api.get("/admin/dashboard/popular-courses");
export const getMonthlyUsers = () =>
api.get("/admin/dashboard/monthly-users");
export const getMonthlyEnrollments = () =>
  api.get("/admin/dashboard/monthly-enrollments");
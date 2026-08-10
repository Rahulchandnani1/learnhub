import api from "./api";

export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};
export const searchCourses = (search) => {
  return api.get(
    `/dashboard/search?search=${search}`
  );
};
export const getCategories = () =>
  api.get("/dashboard/categories");

export const getCoursesByCategory = (category) =>
  api.get(`/dashboard/category/${category}`);
export const getRecommendedCourses = () =>
  api.get("/dashboard/recommended");
export const getContinueLearning = () => {
  return api.get("/dashboard/continue");
};
export const getPopularCourses = () =>
  api.get("/dashboard/popular");
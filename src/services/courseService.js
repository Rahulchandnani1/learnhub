import api from "./api";

export const getCourses = (params) => {
  return api.get("/course", { params });
};

export const createCourse = (data) => {
  return api.post("/course", data);
};

export const updateCourse = (id, data) => {
  return api.put(`/course/${id}`, data);
};

export const deleteCourse = (id) => {
  return api.delete(`/course/${id}`);
};

export const getCourseById = (id) => {
  return api.get(`/course/${id}`);
};

export const enrollCourse = (courseId) => {
  return api.post("/enrollments", {
    courseId,
  });
};
export const getMyCourses = () => {
  return api.get("/enrollments/my-courses");
};
import api from "./api";

// Get all lessons of a course
export const getLessons = (courseId) => {
  return api.get(`/lessons/course/${courseId}`);
};

// Get one lesson
export const getLessonById = (id) => {
  return api.get(`/lessons/${id}`);
};

// Create lesson
export const createLesson = (data) => {
  return api.post("/lessons", data);
};

// Update lesson
export const updateLesson = (id, data) => {
  return api.put(`/lessons/${id}`, data);
};

// Delete lesson
export const deleteLesson = (id) => {
  return api.delete(`/lessons/${id}`);
};
import api from "./api";

// Mark lesson completed
export const markLessonCompleted = (lessonId) => {
  return api.post(`/progress/${lessonId}`);
};

// Check lesson completed
export const checkLessonCompleted = (lessonId) => {
  return api.get(`/progress/check/${lessonId}`);
};

// Get course progress
export const getCourseProgress = (courseId) => {
  return api.get(`/progress/course/${courseId}`);
};
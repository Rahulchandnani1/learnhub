import api from "./api";

export const getCourseReviews = (courseId) => {
  return api.get(`/reviews/course/${courseId}`);
};

export const addReview = (data) => {
  return api.post("/reviews", data);
};
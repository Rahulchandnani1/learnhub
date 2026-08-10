import api from "./api";

export const getQuiz = (lessonId) => {
  return api.get(`/quizzes/lesson/${lessonId}`);
};
export const createQuiz = (data) => {
  return api.post("/quizzes", data);
};

export const submitQuiz = (data) => {
  return api.post("/quizzes/submit", data);
};
export const createQuestion = (data) => {
  return api.post("/quizzes/question", data);
};

export const getQuestions = (quizId) => {
  return api.get(`/quizzes/${quizId}/questions`);
};
export const updateQuestion = (id, data) => {
  return api.put(`/quizzes/question/${id}`, data);
};

export const deleteQuestion = (id) => {
  return api.delete(`/quizzes/question/${id}`);
};
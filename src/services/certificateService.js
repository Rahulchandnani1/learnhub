import api from "./api";

export const downloadCertificate = async (courseId) => {

  const response = await api.get(
    `/certificates/${courseId}`,
    {
      responseType: "blob",
    }
  );

  return response;

};
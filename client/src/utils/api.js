export const submitResponse = (formData) => {
  return fetch("http://localhost:3001/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

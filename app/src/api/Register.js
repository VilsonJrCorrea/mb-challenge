export default {
  post(formData) {
    return fetch("http://localhost:8080/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  },
};

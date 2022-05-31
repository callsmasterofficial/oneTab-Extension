export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export async function apiCall(url = "", data = {},method = "POST") {
  // Default options are marked with *
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-type": "application/json; charset=UTF-8",
   
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

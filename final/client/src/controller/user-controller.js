"use strict";

/**
 * This function makes an HTTP POST log in request to the server.
 * @param {Object} body request body {username} 
 * @returns {Promise} userInfo in JSON
 * {
    "username": "et",
    "userId": "1",
    "sid": "2945a6c7-d45b-4824-9c68-2d6047fdf581",
    "isAdmin": true
   }
 */
export function userLogin(body) {
  return fetch("/api/v1/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}

/**
 * This function makes an HTTP PUT register request to the server
 * @param {Object} body request body {username}
 * @returns {Promise} Registered userInfo in JSON
 */
export function userRegister(body) {
  return fetch("/api/v1/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}

/**
 * This function makes an HTTP DELETE logout request to the server.
 * @returns {Promise} Logged out username
 */
export function userLogout() {
  return fetch("/api/v1/user", {
    method: "DELETE",
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}

"use strict";

/**
 * This method update post $postId with fields in updateField.
 * @param {String} postId Post $postId to update
 * @param {Object} updateField An object containing fields to be update
 * @returns Updated postInfoItem
 */
export function updatePost(postId, updateField) {
  const queryBody = { postId, ...updateField };
  return fetch("/api/v1/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
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
 * This method delete post $postId.
 * @param {String} postId Post $postId to be deleted
 * @returns Deleted $postId
 */
export function deletePost(postId) {
  const queryBody = { postId };
  return fetch("/api/v1/post", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  })
    .catch((error) => {
      return Promise.reject(error);
    })
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
 * This function make an HTTP PUT request to server to create a post.
 * @param {Object} body Query body
 * @returns Post body that it just created
 */
export function createPost(body) {
  return fetch("/api/v1/post", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

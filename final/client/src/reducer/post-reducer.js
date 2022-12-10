"use strict";

import { PostReducerConstant } from "../constants/post-reducer-constant";

/**
 *
 * @param {Object[]} state Previous state object
 * @param {Object} action Action object that contains type and payload property
 * @returns New state object
 */
function reducer(state, action) {
  switch (action.type) {
    case PostReducerConstant.GET_POST:
      return action.payload; // Payload is a list of fetched post in an array

    case PostReducerConstant.CREATE_POST:
      return [action.payload, ...state]; // Payload is the postInfoItem
    case PostReducerConstant.DELETE_POST:
      return state.filter((item) => item.postId !== action.payload.postId); // Payload is the postId
    case PostReducerConstant.UPDATE_POST:
      // Payload contains
      const postId = action.payload.postId;
      const updateField = action.payload.updateField;
      return state.map((item) => {
        if (item.postId === postId) {
          return { ...item, ...updateField };
        }
        return item;
      });
    default:
      return state;
  }
}

export default reducer;

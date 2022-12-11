"use strict";

import PostFormConstant from "../constants/post-form-constant";

function reducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    case PostFormConstant.CREATE:
      return {
        state: PostFormConstant.CREATE,
        formInfo: {
          title: "",
          content: "",
          cover: "",
        },
      };
    case PostFormConstant.UPDATE:
      // Payload need to include: {postId, title, content, cover}
      return {
        state: PostFormConstant.UPDATE,
        formInfo: {
          ...payload,
        },
      };
    case PostFormConstant.CHANGE:
      return {
        state: state.state,
        formInfo: {
          ...state.formInfo,
          ...payload,
        },
      };
    case PostFormConstant.CLEAR:
      return {
        state: PostFormConstant.CREATE,
        formInfo: {
          title: "",
          content: "",
          cover: "",
        },
      };
    default:
      return state;
  }
}

export default reducer;

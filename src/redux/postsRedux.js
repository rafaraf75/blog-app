// selectors
export const getAllPosts = state => state.posts;
export const getPostById = (state, id) => state.posts.find(p => p.id === id);

// actions
const createActionName = actionName => `app/posts/${actionName}`;

// action creators (dodamy później)

// reducer
const postsReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default postsReducer;

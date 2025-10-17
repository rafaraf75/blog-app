// selectors
export const getAllPosts = state => state.posts;
export const getPostById = (state, id) => state.posts.find(p => p.id === id);

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const REMOVE_POST = 'app/posts/REMOVE_POST';
const ADD_POST = createActionName('ADD_POST');

// action creators (dodamy później)
export const removePost = id => ({ type: REMOVE_POST, payload: id });
export const addPost = payload => ({ type: ADD_POST, payload });

// reducer
const postsReducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_POST:
      return statePart.filter(post => post.id !== action.payload);
    case ADD_POST:
      return [...statePart, action.payload];
    default:
      return statePart;
  }
};

export default postsReducer;

// selectors
export const getAllPosts = state => state.posts;
export const getPostById = (state, id) => state.posts.find(p => p.id === id);

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const REMOVE_POST = 'app/posts/REMOVE_POST';
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

// action creators (dodamy później)
export const removePost = id => ({ type: REMOVE_POST, payload: id });
export const addPost = payload => ({ type: ADD_POST, payload });
export const updatePost = payload => ({ type: UPDATE_POST, payload });

// reducer
const postsReducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_POST:
      return statePart.filter(post => post.id !== action.payload);
    case ADD_POST:
      return [...statePart, action.payload];
    case UPDATE_POST:
      return statePart.map(p => (p.id === action.payload.id ? action.payload : p));
    default:
      return statePart;
  }
};

export default postsReducer;

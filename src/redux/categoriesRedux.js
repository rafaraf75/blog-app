// selectors
export const getAllCategories = state => state.categories;
export const getCategoryBySlug = (state, slug) =>
  state.categories.find(c => c.slug === slug);

// reducer (na razie tylko zwraca stan)
const categoriesReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default categoriesReducer;

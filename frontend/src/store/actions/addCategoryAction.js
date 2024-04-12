const ADD_CATEGORY = "ADD_CATEGORY";
export const addPinToCategory = (state, category) => {
    return {
      type: ADD_CATEGORY,
      user: state,
      payload: {
        category
      }
    };
  };
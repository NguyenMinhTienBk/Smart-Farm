// userReducer.js
const initialState = {
  userId: "", // trạng thái ban đầu của userId
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID": // action để set userId
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

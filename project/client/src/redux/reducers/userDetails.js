

const initialState = {
    details: {},
};

const userDetailsReducer = (state = initialState ,action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS': {
            return { ...state, details: action.data };
        }
        default: {
            return state;
        }
    }
}

export default userDetailsReducer;
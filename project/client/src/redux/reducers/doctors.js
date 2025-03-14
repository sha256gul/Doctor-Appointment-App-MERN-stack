

const initialState = {
    docList: [],
    speciality: [],
};

const docReducer = (state = initialState ,action) => {
    switch (action.type) {
        case 'SET_DOC_LIST': {
            return { ...state, docList: action.data };
        }
        case 'SET_SPECIALITY_LIST': {
            return { ...state, speciality: action.data };
        }
        default: {
            return state;
        }
    }
}

export default docReducer;
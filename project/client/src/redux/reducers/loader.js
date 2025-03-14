

const initialState = {
    loader_state: false
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADER_STATE': {
            return {...state, loader_state: action.data }
        }
        default: {
            return state
        }
    }
}

export default loaderReducer
const initialState = {
    navbar: 'top'
}

const navbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NAVBAR': 
            return {
                ...state,
                navbar: action.payload
            }
        default:
            return state;
    }
}

export default navbarReducer;

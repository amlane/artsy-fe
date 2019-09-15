import { REGISTER_USER, LOGIN_USER } from "../actions"

const initialState = {
    user: { id: null, email: "" }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export default reducer;
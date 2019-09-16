import { REGISTER_USER, LOGIN_USER, GET_USER_INFO } from "../actions"

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

            console.log('payload', action.payload)
            return {
                ...state,
                user: action.payload
            }
        case GET_USER_INFO:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
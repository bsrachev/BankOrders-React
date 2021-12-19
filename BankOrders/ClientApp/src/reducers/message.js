import { ACTION_TYPES } from "../actions/usersAction";

const initialState = {};

export default function (state = initialState, action) {
    //const { type, payload } = action;

    switch (action.type) {
        case ACTION_TYPES.SET_MESSAGE:
            return { message: action.payload };

        //case CLEAR_MESSAGE:
        //    return { message: "" };

        default:
            return state;
    }
}
import { ACTION_TYPES } from "../actions/currenciesAction";

const initialState = {
    list: []
}

export const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        default:
            return state;
    }
}
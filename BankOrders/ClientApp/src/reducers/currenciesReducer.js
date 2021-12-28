﻿import { ACTION_TYPES } from "../actions/currenciesAction";

const initialState = {
    currenciesList: []
}

export const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                currenciesList: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                currenciesList: [...state.currenciesList, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                currenciesList: state.currenciesList.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                currenciesList: state.currenciesList.filter(x => x.id != action.payload)
            }

        default:
            return state;
    }
}
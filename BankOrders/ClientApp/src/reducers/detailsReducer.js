import { ACTION_TYPES } from "../actions/detailsAction";

const initialState = {
    detailsList: [],
    singleDetail: {}
}

export const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_D:
            return {
                ...state,
                detailsList: [ ...action.payload ]
            }

        case ACTION_TYPES.FETCH_BY_ID_D:
            return {
                ...state,
                singleDetail: { ...action.payload }
            }

        case ACTION_TYPES.CREATE_D:
            return {
                ...state,
                detailsList: [...state.detailsList, action.payload]
            }

        case ACTION_TYPES.UPDATE_D:
            return {
                ...state,
                detailsList: state.detailsList.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_D:
            return {
                ...state,
                detailsList: state.detailsList.filter(x => x.id != action.payload)
            }

        default:
            return state;
    }
}
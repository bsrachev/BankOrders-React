import { ACTION_TYPES } from "../actions/templatesAction";

const initialState = {
    list: [],
    singleRecord: {}
}

export const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            let listWithFilter = [...action.payload];

            if (action.name != "") {
                listWithFilter = listWithFilter.filter(x => x.name.includes(action.name));
            }
            if (action.refNumber != "") {
                listWithFilter = listWithFilter.filter(x => x.refNumber == action.refNumber);
            }
            if (action.createdBy != "") {
                listWithFilter = listWithFilter.filter(x => x.createdBy == action.createdBy);
            }
            if (action.system != "") {
                listWithFilter = listWithFilter.filter(x => x.system == action.system);
            }

            return {
                ...state,
                list: listWithFilter
            }

        case ACTION_TYPES.FETCH_BY_ID:
            return {
                ...state,
                singleRecord: { ...action.payload }
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }

        default:
            return state;
    }
}
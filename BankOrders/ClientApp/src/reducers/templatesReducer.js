import { ACTION_TYPES } from "../actions/templatesAction";

const initialState = {
    templatesList: [],
    singleTemplate: {}
}

export const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            let templatesListWithFilter = [...action.payload];

            if (action.name != "") {
                templatesListWithFilter = templatesListWithFilter.filter(x => x.name && x.name.includes(action.name));
            }
            if (action.refNumber != "") {
                templatesListWithFilter = templatesListWithFilter.filter(x => x.refNumber == action.refNumber);
            }
            if (action.createdBy != "") {
                templatesListWithFilter = templatesListWithFilter.filter(x => x.userCreate == action.createdBy);
            }
            if (action.system != "") {
                templatesListWithFilter = templatesListWithFilter.filter(x => x.system == action.system);
            }

            return {
                ...state,
                templatesList: templatesListWithFilter
            }

        case ACTION_TYPES.FETCH_BY_ID:
            return {
                ...state,
                singleTemplate: { ...action.payload }
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                templatesList: [...state.templatesList, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                templatesList: state.templatesList.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                templatesList: state.templatesList.filter(x => x.id != action.payload)
            }

        default:
            return state;
    }
}
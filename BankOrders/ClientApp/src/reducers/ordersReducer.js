import { ACTION_TYPES } from "../actions/ordersAction";

const initialState = {
    orderslist: [],
    singleOrder: {}
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            let listWithFilter = [...action.payload];

            if (action.refNumber != "") {
                listWithFilter = listWithFilter.filter(x => x.refNumber == action.refNumber);
            }
            if (action.accountingDateFrom != "") {
                listWithFilter = listWithFilter.filter(x => x.accountingDate >= action.accountingDateFrom);
            }
            if (action.accountingDateTo != "") {
                listWithFilter = listWithFilter.filter(x => x.accountingDate <= action.accountingDateTo);
            }
            if (action.system != "") {
                listWithFilter = listWithFilter.filter(x => x.system == action.system);
            }
            if (action.userCreate != "") {
                listWithFilter = listWithFilter.filter(x => x.userCreate == action.userCreate);
            }
            if (action.userApprove != "") {
                listWithFilter = listWithFilter.filter(x => x.userApprove == action.userApprove);
            }
            if (action.userPosting != "") {
                listWithFilter = listWithFilter.filter(x => x.userPosting == action.userPosting);
            }
            if (action.userApprovePosting != "") {
                listWithFilter = listWithFilter.filter(x => x.userApprovePosting == action.userApprovePosting);
            }
            if (action.postingNumber != "") {
                listWithFilter = listWithFilter.filter(x => x.postingNumber == action.postingNumber);
            }
            if (action.status != "") {
                listWithFilter = listWithFilter.filter(x => x.status == action.status);
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
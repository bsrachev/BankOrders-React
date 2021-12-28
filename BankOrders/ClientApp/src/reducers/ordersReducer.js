import { ACTION_TYPES } from "../actions/ordersAction";

const initialState = {
    ordersList: [],
    singleOrder: {}
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            let ordersListWithFilter = [...action.payload];

            if (action.refNumber != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.refNumber == action.refNumber);
            }
            if (action.accountingDateFrom != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.accountingDate >= action.accountingDateFrom);
            }
            if (action.accountingDateTo != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.accountingDate <= action.accountingDateTo);
            }
            if (action.system != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.system == action.system);
            }
            if (action.userCreate != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.userCreate == action.userCreate);
            }
            if (action.userApprove != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.userApprove == action.userApprove);
            }
            if (action.userPosting != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.userPosting == action.userPosting);
            }
            if (action.userApprovePosting != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.userApprovePosting == action.userApprovePosting);
            }
            if (action.postingNumber != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.postingNumber == action.postingNumber);
            }
            if (action.status != "") {
                ordersListWithFilter = ordersListWithFilter.filter(x => x.status == action.status);
            }

            return {
                ...state,
                ordersList: ordersListWithFilter
            }

        case ACTION_TYPES.FETCH_BY_ID:
            return {
                ...state,
                singleOrder: { ...action.payload }
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                ordersList: [...state.ordersList, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                ordersList: state.ordersList.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                ordersList: state.ordersList.filter(x => x.id != action.payload)
            }

        default:
            return state;
    }
}
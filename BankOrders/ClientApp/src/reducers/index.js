import { combineReducers } from "redux";
import { currenciesReducer } from "./currenciesReducer";
import { ordersReducer } from "./ordersReducer";
import { templatesReducer } from "./templatesReducer";
import { detailsReducer } from "./detailsReducer";
import { usersReducer } from "./usersReducer";

export const reducers = combineReducers({
    currenciesReducer,
    ordersReducer,
    templatesReducer,
    detailsReducer,
    usersReducer
})
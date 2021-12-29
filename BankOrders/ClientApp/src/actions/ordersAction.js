import api from "./api";

export const ACTION_TYPES = {
    CREATE_O: 'CREATE_O',
    UPDATE_O: 'UPDATE_O',
    DELETE_O: 'DELETE_O',
    FETCH_ALL_O: 'FETCH_ALL_O',
    FETCH_BY_ID_O: 'FETCH_BY_ID_O'
}

export const fetchAll = (criteria) => dispatch => {
    api.orders()
        .fetchAllO(criteria)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL_O,
                    payload: response.data,
                    refNumber: criteria.refNumber,
                    accountingDateFrom: criteria.accountingDateFrom,
                    accountingDateTo: criteria.accountingDateTo,
                    system: criteria.system,
                    userCreate: criteria.userCreate,
                    userApprove: criteria.userApprove,
                    userPosting: criteria.userPosting,
                    userApprovePosting: criteria.userApprovePosting,
                    postingNumber: criteria.postingNumber,
                    status: criteria.status
                })
            })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.orders()
            .fetchByIdO(id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_BY_ID_O,
                        payload: response.data
                    });
                    resolve(response);
                })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export const create = (data) => dispatch => {
    api.orders()
        .createO(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.CREATE_O,
                    payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const update = (id, data) => dispatch => {
    api.orders()
        .updateO(id, data)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_O,
                payload: { id, ...data }
            })
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    api.orders()
        .deleteO(id)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.DELETE_O,
                payload: id
            })
        })
        .catch(err => console.log(err))
}
import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

/*const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})*/

export const fetchAll = (criteria) => dispatch => {
    api.orders()
        .fetchAll(criteria)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
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


export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    console.log(data)
    api.orders()
        .create(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.CREATE,
                    payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    //data = formateData(data)
    api.orders().update(id, data)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.orders().delete(id)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
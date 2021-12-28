import api from "./api";

export const ACTION_TYPES = {
    CREATE_C: 'CREATE_C',
    UPDATE_C: 'UPDATE_C',
    DELETE_C: 'DELETE_C',
    FETCH_ALL_C: 'FETCH_ALL_C'
}

export const fetchAll = () => dispatch => {
    api.currencies()
        .fetchAllC()
        .then(
            response => {
                //console.log(response.data)
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL_C,
                    payload: response.data
                })
            })
        .catch(err => console.log(err))
}


export const create = (data, onSuccess) => dispatch => {
    api.currencies()
        .createC(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.CREATE_C,
                    payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    api.currencies()
        .updateC(id, data)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_C,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.currencies()
        .deleteC(id)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.DELETE_C,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
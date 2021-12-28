import api from "./api";

export const ACTION_TYPES = {
    CREATE_D: 'CREATE_D',
    UPDATE_D: 'UPDATE_D',
    DELETE_D: 'DELETE_D',
    FETCH_ALL_D: 'FETCH_ALL_D',
    FETCH_BY_ID_D: 'FETCH_BY_ID_D'
}

export const fetchAll = () => dispatch => {
    api.details()
        .fetchAllD()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL_D,
                    payload: response.data,
                })
            })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.details()
            .fetchByIdD(id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_BY_ID_D,
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
    api.details()
        .createD(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.CREATE_D,
                    payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const update = (id, data) => dispatch => {
    api.details()
        .updateD(id, data)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_D,
                payload: { id, ...data }
            })
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    api.details()
        .deleteD(id)
        .then(
            response => {
            dispatch({
                type: ACTION_TYPES.DELETE_D,
                payload: id
            })
        })
        .catch(err => console.log(err))
}
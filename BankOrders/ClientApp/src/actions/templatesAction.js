import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID'
}

/*const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})*/

export const fetchAll = () => dispatch => {
    api.templates()
        .fetchAll()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.templates()
            .fetchById(id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_BY_ID,
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

export const create = (data, onSuccess) => dispatch => {
    api.templates()
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
    api.templates().update(id, data)
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
    api.templates().delete(id)
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
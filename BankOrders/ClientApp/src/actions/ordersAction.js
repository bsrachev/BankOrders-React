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

export const fetchAll = () => dispatch => {
    api.orders()
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
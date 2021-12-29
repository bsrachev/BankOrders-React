import api from "./api";

export const ACTION_TYPES = {
    CREATE_T: 'CREATE_T',
    UPDATE_T: 'UPDATE_T',
    DELETE_T: 'DELETE_T',
    FETCH_ALL_T: 'FETCH_ALL_T',
    FETCH_BY_ID_T: 'FETCH_BY_ID_T'
}

/*const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})*/

export const fetchAll = (criteria) => dispatch => {
    api.templates()
        .fetchAllT(criteria)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL_T,
                    payload: response.data,
                    name: criteria.name,
                    refNumber: criteria.refNumber,
                    createdBy: criteria.createdBy,
                    system: criteria.system
                })
            })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.templates()
            .fetchByIdT(id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_BY_ID_T,
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
    api.templates()
        .createT(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.CREATE_T,
                    payload: response.data
                })
            })
        .catch(err => console.log(err))
}

export const update = (id, data) => dispatch => {
    //data = formateData(data)
    api.templates()
        .updateT(id, data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.UPDATE_T,
                    payload: { id, ...data }
                })
            })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    api.templates()
        .deleteT(id)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.DELETE_T,
                    payload: id
                })
            })
        .catch(err => console.log(err))
}
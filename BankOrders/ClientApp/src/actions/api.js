import axios from "axios";

const baseUrl = "https://localhost:5001/api/"

export default {
    currencies(url = baseUrl + 'currencies/') {
        return {
            fetchAllC: () => axios.get(url),
            fetchByIdC: id => axios.get(url + id),
            createC: newRecord => axios.post(url, newRecord),
            updateC: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteC: id => axios.delete(url + id)
        }
    },

    orders(url = baseUrl + 'orders/') {
        return {
            fetchAllO: () => axios.get(url),
            fetchByIdO: id => axios.get(url + id),
            createO: newRecord => axios.post(url, newRecord),
            updateO: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteO: id => axios.delete(url + id)
        }
    },

    templates(url = baseUrl + 'templates/') {
        return {
            fetchAllT: () => axios.get(url),
            fetchByIdT: id => axios.get(url + id),
            createT: newRecord => axios.post(url, newRecord),
            updateT: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteT: id => axios.delete(url + id)
        }
    },

    details(url = baseUrl + 'details/') {
        return {
            fetchAllD: () => axios.get(url),
            fetchByIdD: id => axios.get(url + id),
            createD: newRecord => axios.post(url, newRecord),
            updateD: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteD: id => axios.delete(url + id)
        }
    },

    users(url = baseUrl + 'authenticate/') {
        return {
            login: user => axios.post(url + 'login/', user),
            register: newUser => axios.post(url + 'register/', newUser)
        }
    }
}
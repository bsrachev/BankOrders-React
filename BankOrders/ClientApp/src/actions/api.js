import axios from "axios";

const baseUrl = "https://localhost:5001/api/"

export default {
    currencies(url = baseUrl + 'currencies/') {
        console.log(axios.get(url))
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
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },

    templates(url = baseUrl + 'templates/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
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
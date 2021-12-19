import api from "./api";
import AuthService from "../services/authService";


export const ACTION_TYPES = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT: "LOGOUT",
    GET_CURRENT_USER: "GET_CURRENT_USER",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    SET_MESSAGE: "SET_MESSAGE",
    //CLEAR_MESSAGE: "CLEAR_MESSAGE"
}

export const register = (newUser) => (dispatch) => {
    console.log(newUser);
    return AuthService.register(newUser).then(
        (response) => {
            dispatch({
                type: ACTION_TYPES.REGISTER_SUCCESS,
            });

            dispatch({
                type: ACTION_TYPES.SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ACTION_TYPES.REGISTER_FAIL,
            });

            dispatch({
                type: ACTION_TYPES.SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (user) => (dispatch) => {
    return AuthService.login(user).then(
        (data) => {
            dispatch({
                type: ACTION_TYPES.LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ACTION_TYPES.LOGIN_FAIL,
            });

            dispatch({
                type: ACTION_TYPES.SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: ACTION_TYPES.LOGOUT,
    });
};

export const getCurrentUser = () => (dispatch) => {
    AuthService.getCurrentUser();

    dispatch({
        type: ACTION_TYPES.GET_CURRENT_USER,
    });
};

export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.REFRESH_TOKEN,
        payload: accessToken,
    })
}

export const setMessage = (message) => ({
    type: ACTION_TYPES.SET_MESSAGE,
    payload: message,
});

/*export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

class AuthService {
    login(username, password) {
        return api.users()
                   .login({
                       username,
                       password
                   })
                   .then(response => {
                       if (response.data.accessToken) {
                           TokenService.setUser(response.data);
                       }

                       return response.data;
                   });
    }

    register(employeeNumber, password, confirmPassword, fullName, email) {
        return api.users().register({
            employeeNumber,
            password,
            confirmPassword,
            fullName,
            email
        });
    }

    logout() {
        TokenService.removeUser();
    }

}

class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        console.log(JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}*/
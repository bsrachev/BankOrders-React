import api from "../actions/api";
import TokenService from "./tokenService";

class AuthService {
    login(user) {
        return api.users()
            .login(user)
            .then(response => {
                if (response.data.token) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    register(newUser) {
        return api.users().register(newUser);
    }

    logout() {
        TokenService.removeUser();
    }

    getCurrentUser() {
        TokenService.getUser();
    }

}

export default new AuthService();
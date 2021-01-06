// import { toastr } from 'react-redux-toastr'
import axios from "axios";

export class LoginService {

    static _withBaseUrl(path) {
        // return `http://localhost:8080/${path}`;
        return `https://b-meriymoney.herokuapp.com/${path}`;
    }

    static login({email, password}) {
        return axios.post(LoginService._withBaseUrl("login"), {email, password});
    }

    static signup({name, email, password, confirmPassword }) {
        return axios.post(LoginService._withBaseUrl("signup"), {name, email, password, confirmPassword});
    }

    static getUsers() {
        return axios.get(LoginService._withBaseUrl("users"));
    }

}

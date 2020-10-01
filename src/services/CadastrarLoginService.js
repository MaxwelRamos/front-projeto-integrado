import axios from "axios";

export class CadastrarLoginService {

    static _withBaseUrl(path) {
        return `http://localhost:8080/`;
    }

    static createLogin({ name, email, password }) {
        return axios.post('http://localhost:8080/users', { name, email, password })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }
}
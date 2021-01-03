import axios from "axios";

export class ValidadeTokenService {

    static _withBaseUrl(path) {
        return `http://localhost:8080/${path}`;
    }

    static ValidadeToken({ token }) {
        return axios.post(ValidadeTokenService._withBaseUrl("validateToken"), { token });
    }
}

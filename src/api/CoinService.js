import axios from "axios";

export class CoinService {
    static _withBaseUrl(path) {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        axios.defaults.headers.common['authorization'] = user.token;
        // return `http://localhost:8080/${path}`;
        return `https://b-meriymoney.herokuapp.com/${path}`;
    }

    static setSaldoMensal() {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        return axios.post(CoinService._withBaseUrl("setSaldoMensal"), {emailUsuario : user ? user.email : ''});
    }

    static sendCoins({emailDestino, quantidadeMoeda, motivo }) {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        return axios.post(CoinService._withBaseUrl("envioCoins"), {emailDestino, quantidadeMoeda, motivo}, {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getSaldo() {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        return axios.get(CoinService._withBaseUrl("getSaldo"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedasEnviadas() {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        return axios.get(CoinService._withBaseUrl("moedasEnviadas"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedasRecebidas() {
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_USERKEY));
        return axios.get(CoinService._withBaseUrl("moedasRecebidas"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedas(filtro) {
            return axios.post(CoinService._withBaseUrl("moedas"), filtro);
    }
}

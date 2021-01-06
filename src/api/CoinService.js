// import { toastr } from 'react-redux-toastr'
import axios from "axios";

const userKey = '_meritMoney_user';
export class CoinService {
    static _withBaseUrl(path) {
        const user = JSON.parse(localStorage.getItem(userKey));
        axios.defaults.headers.common['authorization'] = user.token;
        return `http://localhost:8080/${path}`;
    }

    static setSaldoMensal() {
        const user = JSON.parse(localStorage.getItem(userKey));
        return axios.post(CoinService._withBaseUrl("setSaldoMensal"), {emailUsuario : user ? user.email : ''});
    }

    static sendCoins({emailDestino, quantidadeMoeda, motivo }) {
        const user = JSON.parse(localStorage.getItem(userKey));
        return axios.post(CoinService._withBaseUrl("envioCoins"), {emailDestino, quantidadeMoeda, motivo}, {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getSaldo() {
        const user = JSON.parse(localStorage.getItem(userKey));
        return axios.get(CoinService._withBaseUrl("getSaldo"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedasEnviadas() {
        const user = JSON.parse(localStorage.getItem(userKey));
        return axios.get(CoinService._withBaseUrl("moedasEnviadas"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedasRecebidas() {
        const user = JSON.parse(localStorage.getItem(userKey));
        return axios.get(CoinService._withBaseUrl("moedasRecebidas"), {headers: {'x-tenant-id' : user ? user.email : ''}});
    }

    static getMoedas(filtro) {
            return axios.post(CoinService._withBaseUrl("moedas"), filtro);
    }
}
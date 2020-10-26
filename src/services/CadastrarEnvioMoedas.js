import axios from "axios";
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:8080'

export class CadastrarEnvioMoedas {

    static createEnvioMoeda(values) {
        return axios.post(`${BASE_URL}/moedas`, values)
            .then((response) => {
                toastr.success('Sucesso', response.data.message)
            })
            .catch((err) => {
                 toastr.error('Erro', err.response.data.message)
            })
    }
}
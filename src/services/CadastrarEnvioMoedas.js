import axios from "axios";
import { toastr } from 'react-redux-toastr'

// const BASE_URL = 'http://localhost:8080'
const BASE_URL = 'https://b-meriymoney.herokuapp.com'

export class CadastrarEnvioMoedas {

    static createEnvioMoeda(values) {
        console.log(BASE_URL)
        return axios.post(`${BASE_URL}/moedas`, values)
            .then((response) => {
                toastr.success('Sucesso', response.data.message)
            })
            .catch((err) => {
                 toastr.error('Erro', err.response.data.message)
            })
    }
}
import {
    SET_EMAILDESTINO,
    SET_QUANTIDADE,
    SET_MOTIVO
} from "../actions/enviarMoedas";

const initialState = {
    emailDestino: "",
    quantidadeMoeda: 0,
    motivo: ""
};

export const enviarMoedas = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAILDESTINO:
            return {
                ...state,
                emailDestino: action.payload.emailDestino
            };

        case SET_QUANTIDADE:
            return {
                ...state,
                quantidadeMoeda: action.payload.quantidade
            };

        case SET_MOTIVO:
            return {
                ...state,
                motivo: action.payload.motivo
            };
        default:
            return state;
    }
};
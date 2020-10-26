export const SET_EMAILDESTINO = "SET_EMAILDESTINO";
export const SET_QUANTIDADE = "SET_QUANTIDADE";
export const SET_MOTIVO = "SET_MOTIVO";

export const setEmailDestino = emailDestino => ({
    type: SET_EMAILDESTINO,
    payload: emailDestino
});

export const setQuantidade = quantidade => ({
    type: SET_QUANTIDADE,
    payload: quantidade
});

export const setMotivo = motivo => ({
    type: SET_MOTIVO,
    payload: motivo
});
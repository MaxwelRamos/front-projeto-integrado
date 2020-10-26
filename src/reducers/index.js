import { combineReducers } from "redux";
import { enviarMoedas } from "./enviarMoedas";
import { reducer as toastrReducer } from 'react-redux-toastr'

export const reducers = combineReducers({
    enviarMoedas,
    toastr: toastrReducer
});
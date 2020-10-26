import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { setEmailDestino } from '../actions/enviarMoedas';
import { setQuantidade } from '../actions/enviarMoedas';
import { setMotivo } from '../actions/enviarMoedas';
import { useSelector } from "react-redux";
import { CadastrarEnvioMoedas } from "../services/CadastrarEnvioMoedas";


export const EnviarDoacoes = () => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = React.useState('');
    const result = useSelector(state => state.enviarMoedas);


    const handleChange = (event) => {
        setCurrency(event.target.value);
        dispatch(setEmailDestino({ emailDestino: event.target.value }))
    };

    const enviarMoedas = async () => {
        await CadastrarEnvioMoedas.createEnvioMoeda(result);
    };

    const currencies = [
        {
            //   value: 'USD',
            value: 'gronesoft.atendimento@gmail.com',
        },
        {
            //   value: 'EUR',
            value: 'maxwel@ig.com.br',
        },
        {
            //   value: 'BTC',
            value: 'pucminas@gmail.com',
        },
        {
            //   value: 'JPY',
            value: 'maxwel@noventa.com.br',
        },
    ];

    return (
        <div>
            <h2>Doar Moedas</h2>
            <Grid container spacing={3}>
                {/* <Paper className='paper'> */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        id="firstName"
                        name="firstName"
                        label="Procure por um usuário"
                        value={currency}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="given-name"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value} >
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Quantidade de Moedas"
                        type="currencies"
                        fullWidth
                        autoComplete="family-name"
                        onChange={event => dispatch(setQuantidade({ quantidade: event.target.value }))}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Motivo"
                        fullWidth
                        autoComplete="family-name"
                        onChange={event => dispatch(setMotivo({ motivo: event.target.value }))}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={enviarMoedas}>
                        ENVIAR MOEDAS
                    </Button>
                </Grid>
                {/* </Paper> */}
            </Grid>
        </div>
    );
};
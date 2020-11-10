import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CadastrarLogin } from "./components";
import { Dashboard, DashboardX, EnviarDoacoes, Moedas } from "./components";

export const ApplicationRoutes = () => (
  <>
    {/* <Route path="/" exact component={CadastrarLogin} />  */}
    <Route path="/" exact component={Moedas} /> 
    <Route path="/enviarDoacoes" exact component={EnviarDoacoes} />
    {/* <Redirect from='*' to='/' /> */}
  </>
);
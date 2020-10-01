import React from "react";
import { Route } from "react-router-dom";
import { CadastrarLogin } from "./components";

export const ApplicationRoutes = () => (
  <>
    <Route path="/" exact component={CadastrarLogin} />
  </>
);
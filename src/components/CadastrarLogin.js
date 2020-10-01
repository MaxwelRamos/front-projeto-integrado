import React, { useState } from "react";
// import { Button } from '../visual/button'
import { CadastrarLoginService } from "../services/CadastrarLoginService";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AlertDanger } from "./AlertDanger";

import '../../src/styles.css';


export const CadastrarLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const addLogin = async () => {

    if (!validade())
      return;
    CadastrarLoginService.createLogin({ name, email, password }, (err) => {
    })
  };

  const validade = () => {
    if (!name) return setErro({ message: "Preencha o campo nome!" })
    if (!email) return setErro({ message: "Preencha o campo e-mail!" })
    if (!password) return setErro({ message: "Preencha o campo senha!" })

    return true;
  }

  return (
    // <div>
    //   <Button onClick={addLogin}>Cadastrar Login API</Button><br /><br />
    // </div>
    <>
      <div className="container-login">
        <div className="login card shadow">
          <Form className="form-signin text-center">
            {/* <img className="mb-4" src="images/logo_celke.png" alt="Celke" width="72" height="72" /> */}
            <h1 className="h3 mb-3 font-weight-normal">Novo Usuário</h1>
            <AlertDanger erros={erro} />
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input
                type="name"
                value={name}
                name="name"
                id="name"
                placeholder="Digite o nome Completo"
                onChange={event => setName(event.target.value)} />
              {/* onChange={(ev) => this.onChangeInput("name", ev)} /> */}
            </FormGroup>

            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                type="email"
                value={email}
                name="email"
                id="email"
                placeholder="E-mail do usuário"
                onChange={event => setEmail(event.target.value)} />
              {/* onChange={(ev) => this.onChangeInput("email", ev)} /> */}
            </FormGroup>

            <FormGroup>
              <Label for="password">Senha</Label>
              <Input
                type="password"
                value={password}
                name="password"
                id="password"
                placeholder="Senha do usuário"
                onChange={event => setPassword(event.target.value)} />
              {/* onChange={(ev) => this.onChangeInput("password", ev)} /> */}
            </FormGroup>

            <Button
              color="primary btn-block"
              size="lg"
              // onClick={() => this.handleLogin()}>Acessar</Button>
              onClick={addLogin}>Cadastrar</Button>
            <p className="text-center mt-2">Esqueceu a senha?</p>
          </Form>
        </div>
      </div>
    </>
  );
};

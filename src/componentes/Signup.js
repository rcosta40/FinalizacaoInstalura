import React, {Component} from "react";
import {browserHistory} from "react-router";

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {login:"", senha:"", confirmacao:"", urlPerfil:"", msgerro1:"", msgerro2:""};
        this.setLogin = this.setLogin.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setConfirmacao = this.setConfirmacao.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }

    setLogin(evento) {

        this.setState({login:evento.target.value});        
    }

    setSenha(evento) {

        this.setState({senha:evento.target.value})
    }

    setConfirmacao(evento) {

        this.setState({confirmacao:evento.target.value});
    }

    setUrl(evento) {

        this.setState({urlPerfil:evento.target.value});
    }

    enviaDados(event){

        console.log(this.state);

        event.preventDefault();
        this.limpaErros();
        this.adicionaMensagem();


        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.login, 
                senha: this.state.senha, 
                urlPerfil: this.state.urlPerfil
            }),
            headers: new Headers({

                "Content-type":"application/json",
                "X-AUTH-TOKEN":""
            })
        };

        fetch(`https://instalura-api.herokuapp.com/usuarios`, requestInfo)

            .then(response => {
                    
                if(response.ok){

                    return response.text();
                } else{

                    this.acionaBotao();
                    throw new Error("Não foi possível realizar o signup");                    
                }
            })
            .then(token => {

                console.log(token);
                localStorage.setItem("token",token);
                browserHistory.push("/");
            })
            .catch(err => this.setState({msgerro1:err.message}));
    }

    adicionaMensagem(){

        if(this.state.login === this.state.senha && this.state.senha === this.state.confirmacao){
            this.desativaBotao()
            this.setState({msgerro1:"Senha igual ao username"});
            throw "error";

        }
        if(this.state.senha !== this.state.confirmacao && this.state.login !== this.state.senha){
            this.desativaBotao()
            this.setState({msgerro1:"Senha não confere"});
            throw "error";
        }
        if(this.state.login === this.state.senha && this.state.senha !== this.state.confirmacao){
            this.desativaBotao()
            this.setState({msgerro1:"Senha não confere", msgerro2:"Senha igual ao username"});
            throw "error";
        }
    }

    limpaErros(){

        this.setState({msgerro1:"", msgerro2:""});
    }

    encaminhaTimeline(){

        browserHistory.push("/timeline");
    }

    componentDidMount(){

        let botao = document.getElementById("botao-timeline");
        botao.style.display = "none";
    }

    desativaBotao() {

        let botao = document.getElementById("botao-timeline");
        botao.style.display = "none";
    }

    acionaBotao(){
        const botao = document.getElementById("botao-timeline");
        botao.style.display = "block";
    }

    render(){
        return (
            <div className="signup-box">
                <h1>Signup</h1>
                <h3 className="msg-erro">{this.state.msgerro1}</h3>
                <h3 className="msg-erro">{this.state.msgerro2}</h3>
                <button id="botao-timeline" onClick={this.encaminhaTimeline}>Siga para a timeline</button>
                <form onSubmit={this.enviaDados.bind(this)}>
                    <h3>Login</h3>
                    <input type="text" required="required" value={this.state.login} onChange={this.setLogin}/>
                    <h3>Senha</h3>
                    <input type="password" required="required" value={this.state.senha} onChange={this.setSenha}/>
                    <h3>Confirmação</h3>
                    <input type="password" required="required" value={this.state.confirmacao} onChange={this.setConfirmacao}/>
                    <h3>URL do Perfil</h3>
                    <input value={this.state.urlPerfil} onChange={this.setUrl} placeholder="http://endereco.com" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"/>
                    <input type="submit" value="Signup"/>
                </form>
            </div>
        );
    }
}
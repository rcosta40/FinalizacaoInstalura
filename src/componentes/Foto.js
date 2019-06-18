import React, { Component } from 'react';
import {Link} from "react-router";

class FotoAtualizacoes extends Component {

    like(event){

        event.preventDefault();
        this.props.like(this.props.foto.id);
    }

    comenta(event){

        event.preventDefault();

        this.props.comenta(this.props.foto.id, this.comentario.value);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} href="#" className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>            
        );
    }
}

class FotoInfo extends Component {

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">
                {
                  this.props.foto.likers.map(liker => {
                    return (<Link href={`/timeline/${liker.login}`} key={liker.login}>{liker.login},</Link>)
                  })
                }
                 
                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.foto.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.props.foto.comentarios.map(comentario => {
                    return (
                      <li className="comentario" key={comentario.id}>
                        <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                        {comentario.texto}
                      </li>
                    );
                  })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    apaga(event){
        event.preventDefault();
        this.props.apaga(this.props.foto.id);
    }

    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
              <span className="botao-apaga" onClick={this.apaga.bind(this)}>
              Apagar foto 
              </span>
            </header>            
        );
    }
}

export default class FotoItem extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader {...this.props}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes {...this.props}/>
          </div>            
        );
    }
}
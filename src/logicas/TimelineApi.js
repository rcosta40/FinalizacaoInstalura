import {listagem, comentario, like, notifica, apaga} from "../actions/actionCreator";

export default class TimelineApi{

    static lista(urlPerfil){

        return dispatch => {
            fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                
                dispatch(listagem(fotos));
                return fotos;
            });
        }
    }

    static comenta(fotoId, textoComentario){

        return dispatch => {

            const requestInfo = {

                method: "POST",
                body:JSON.stringify({texto: textoComentario}),
                headers: new Headers({
                    "Content-type": "application/json"
                })
            }

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem("auth-token")}`,requestInfo)
            .then(response => {
                if(response.ok){

                    return response.json();
                } else {

                    throw new Error("Não foi possível comentar")
                }
            })
            .then(novoComentario => {

                dispatch(comentario(fotoId, novoComentario));
                return novoComentario;
            })

            .catch(error => {

                console.log(error);
                
            });
        }
    }

    static like(fotoId){

        return dispatch => {

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method: "POST"})
            .then(response => {
                
                if(response.ok){

                    return response.json();
                } else{

                    throw new Error("Não foi possível realizar o like");
                }
            })
            .then(liker => {

            dispatch(like(fotoId, liker));
            return liker;
            })
            .catch(error => {

                console.log(error);
                
            });
        }
    }

    static pesquisa(login){

        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${login}`)
            .then(response => response.json())
            .then(fotos => { 

                if(fotos.length === 0){

                    dispatch(notifica("Usuário não encontrado"));
                } else{

                    dispatch(notifica("Usuário encontrado"));
                }
                dispatch(listagem(fotos));
                return fotos;
            });
        }
    }

    static apaga(fotoId) {
        
        return dispatch => {
          fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}`, { 
            headers: {
              "x-token": localStorage.getItem('auth-token')
            },
            method: 'DELETE' 
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("não foi possível apagar a foto");
              }
            })
            .then(result => {
              
              dispatch(apaga(fotoId));
              return result;
            })
            .catch((erro) => {
              dispatch(notifica(erro))
            })
            ;
        }
    }
}
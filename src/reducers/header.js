export function notificacao(state="", action){

    if(action.type === "ALERT"){
        
        return action.msg
    }else{

        return state;
    }
};
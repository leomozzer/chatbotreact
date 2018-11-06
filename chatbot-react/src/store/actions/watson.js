import axios from 'axios'

import { enviaMensagem } from './chat'

export const conversaWatsonRequest = ()=>{
    return{
        type: 'CONVERSA_WATSON_REQUEST',
        carregando: true,
        erro: false
    }
}

export const conversaWatsonSucess = (respostas) => {
    return{
        type: 'CONVERSA_WATSON_SUCESS',
        respostas,
        carregando: false,
        erro: false
    }
}

export const conversaWatsonError = () => {
    return {
        type: 'CONVERSA_WATSON_ERRO',
        carregando: false,
        erro: true
    }
}

export const conversaWatson = ((mensagem, contexto) =>{
    return dispatch => {
        dispatch(conversaWatsonRequest())
        //chama o backend do watson (firebase CF)
        const url = 'https://us-central1-react-chatbot-leo.cloudfunctions.net/conversa'
        axios
            .post(url, { input: mensagem.text, context: contexto})
            .then((data) => {
                dispatch(conversaWatsonSucess(data))
                const msg = {
                    texto: data.data.output.text[0],
                    origem: 'bot'
                }
                //console.log(msg.texto)
                dispatch(enviaMensagem(msg))
            })
            .catch(() => dispatch(conversaWatsonError()))
    }
})
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

        console.log('conversaWatson')
        console.log(mensagem)

        //chama o backend do watson (firebase CF)
        /*if(mensagem){
            console.log('mensagem '+mensagem)
        }
        if(mensagem.texto){
            console.log('mensagem '+mensagem.texto)
        }
        if(mensagem.text){
            console.log('mensagem '+ mensagem.text)
        }*/
        //const test = mensagem.texto

        console.log('axios parameter')
        console.log({input: mensagem, context: contexto})

        const url = 'https://us-central1-react-chatbot-leo.cloudfunctions.net/conversa'
        axios
            .post(url, {input: mensagem.texto, context: contexto})
            .then((data) => {
                //console.log('msg.texto'+mensagem.texto)
                dispatch(conversaWatsonSucess(data))
                const msg = {
                    texto: data.data.output.text[0],
                    origem: 'bot'
                }
                
                //console.log('msg.texto'+mensagem.texto)
                //console.log('data.data.input'+[data.data.input]);
                //console.log(data.data.input)
                dispatch(enviaMensagem(msg))
            })
            .catch(() => dispatch(conversaWatsonError()))
    }
}) 
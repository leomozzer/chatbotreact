const functions = require('firebase-functions');
const watson = require('watson-developer-cloud/assistant/v1');
require('dotenv').config()
const cors = require('cors')({ origin: true})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
 //response.send("Hello from Firebase!");
//});

const chatbot = new watson({
    username: process.env.USER_NAME,
    password: process.env.PASSWORD, 
    version: process.env.VERSION,
});

const workspace_id = process.env.WORKSPACE_ID

exports.conversa = functions.https.onRequest((req, res)=>{
    cors(req, res, () =>{
        // console.log('request: ' + req)
        // console.log('request.body: ' + req.body)
        // console.log('request.input: ' + req.input)
        // console.log('request.body.input: ' + req.body.input)
        console.log('user input: ' + req.body.input)
        let payload = {
            workspace_id,
            context: req.body.context || {},
            input: { text: req.body.input } || {}
        };
        console.log('payload')
        console.log(payload)
        chatbot.message(payload, (err, data)=>{
            console.log('payload.input: ' + payload.input)
            if(err){
                console.log(err)
                return res.status(err.code || 500).json(err)
            }
    
            return res.json(trataResposta(payload, data))
        })
    })  
})

const trataResposta = (payload, resposta) =>{
    console.log('Watson disse: ', resposta.output.text[0]);
    return resposta;
}
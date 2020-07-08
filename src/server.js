const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");


var express = require('express');
var app = express();

app.get("/",(req, res)=> {
  // Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");


bot.create().then((client) => start(client));



 function start(client) {


  client.onStateChange((state) => {
    console.log(state);
    const conflits = [
      bot.SocketState.CONFLICT,
      bot.SocketState.UNPAIRED,
      bot.SocketState.UNLAUNCHED,
    ];
    if (conflits.includes(state)) {
      client.useHere();
    }
  });
  client.onMessage((message) => {

    (async () => {
     
    
    let resp = await stages.step[getStage(message.from,message.body)].obj.execute(
      message.from,
      message.body,
      message.sender.name
    );
    
  if (resp == "!@#$%#"){

     }else{
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);
    }
  }
  })()
  });

  function getStage(user, resp) {
    if (banco.db[user]) {
      //Se existir esse numero no banco de dados
      if(banco.db[user].stage == 4){
          console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 11))

        client.sendText("557991916927@c.us", `Cliente deseja sua atenção sobre ${resp} \n ${linkcliente}`);// enviar mensagem quando solicita falar com secretaria
        
      }
      return banco.db[user].stage;
    } else {
      //Se for a primeira vez que entra e contato
      banco.db[user] = {
        stage: 0,
        itens: [],
      };
      return banco.db[user].stage;
    }
    
  }
  


}


console.log("entrou na função")

})
//app.use(express.static(__dirname + '/')); //__dir and not _dir
var port = 3000; // you can use any port
app.listen(port);
console.log('server on' + port);
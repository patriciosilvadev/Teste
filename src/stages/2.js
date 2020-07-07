const banco = require("../banco");
const bot = require("venom-bot");
const googleeventos = require("./consultaeventosgoogle.js");


  async function execute(user, msg) {
  
  const {google} = require('googleapis');
  console.log(user)
    // pega o numero do whats
  if (msg  == 1) {


    const telefonecliente = user.substring(0, user.indexOf("@c.u")).trim();
              
    console.log(telefonecliente +"aqui  ")
    const eventosfinal =await   googleeventos.eventesgoogleapi( telefonecliente)
    console.log(eventosfinal)
      const eventosagenda = [];
     for(let i=0; i< eventosfinal.length;i++){
      eventosagenda.push(  `Nome cliente : ${eventosfinal[i].nomecliente} \n Data: ${eventosfinal[i].start} \n Link reagendamento: ${eventosfinal[i].linkreagendar} \n`)
     }
     if(eventosagenda == 0){
       return ["Infelimente nao localizamos com o numero informado digite *0* para voltar ao menu anterior ou tente outro numero"]

     }else{
     banco.db[user].stage = 0;
    return eventosagenda
    }

  }

    // cliente digitando um outro numero para consulta
   if (msg.replace(/ /g,"").replace(/-/g,"").trim().length == 10 || msg.replace(/ /g,"").replace(/-/g,"").trim().length == 11) {

    console.log(msg.replace(/ /g,"").replace(/-/g,"").trim().length)
    
    
    console.log("aqui10")
    if(msg.replace(/ /g,"").replace(/-/g,"").trim().length == 11){
      const resultaodobruto = msg.replace(/ /g,"").replace(/-/g,"").trim()
      const telefonecliente = "55"+resultaodobruto.substring(0,2)+resultaodobruto.substring(4,14)
      console.log(telefonecliente + "1111111")
      const eventosfinal =await   googleeventos.eventesgoogleapi( telefonecliente)
      console.log(eventosfinal)
      const eventosagenda = [];
     for(let i=0; i< eventosfinal.length;i++){
      eventosagenda.push(  `Nome cliente : ${eventosfinal[i].nomecliente} \n Data: ${eventosfinal[i].start} \n Link reagendamento: ${eventosfinal[i].linkreagendar} \n`)
     }
     
     if(eventosagenda == 0){
      return ["Infelimente nao localizamos com o numero informado digite *0* ou tente outro numero"]

    }else{
    banco.db[user].stage = 0;
   return eventosagenda
   }

    
    }else{
    const telefonecliente = "55" + msg.replace(/ /g,"").replace(/-/g,"").trim();
    console.log(telefonecliente +" aqui o numero com 10")
    const eventosfinal =await   googleeventos.eventesgoogleapi( telefonecliente)
    console.log(eventosfinal)
      const eventosagenda = [];
     for(let i=0; i< eventosfinal.length;i++){
      eventosagenda.push(  `Nome cliente : ${eventosfinal[i].nomecliente} \n Data: ${eventosfinal[i].start} \n Link reagendamento: ${eventosfinal[i].linkreagendar} \n`)
     }
     if(eventosagenda == 0){
       return ["Infelimente nao localizamos com o numero informado digite *0* ou tente outro numero"]

     }else{
     banco.db[user].stage = 0;
    return eventosagenda
    }
    }
    
   
      }

      
      if (msg  == 0) {
        banco.db[user].stage = 1;
        return [
          "O que você deseja fazer?",
          `Digite *1* Nova Consulta \nDigite *2* Reagendar Consulta \nDigite *3* Cancelar agendamento \nDigite *4* Para falar com a secretaria\n`,
        ];;
  }
 

  return [ "Favor informar o numero conforme o exemplo \nExemplo:*79 99191-6827*\nDigite *0* para voltar ao menu anterior"];



     
      
}




exports.execute = execute;

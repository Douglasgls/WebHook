import amqp, { Channel } from 'amqplib';

console.log('Service Worker');

async function reciveMessage(queue:string){
    const connection =  await amqp.connect('amqp://guest:guest@localhost');
    const channel: Channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: true
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, async function(msg) {
    console.log(" [x] Received %s", msg?.content.toString());
    if(msg){
        const sendClient = await sendWebHook('http://localhost:3000/cliente/webhook/status', msg.content.toString())
        const sendGerente = await sendWebHook('http://localhost:3000/gerente/webhook/status', msg.content.toString())
        console.log(" Resposta cliente: ", await sendClient.json());
        console.log(" Resposta gerente: ", await sendGerente.json());
    }
    },{
        noAck: true
    })
}

reciveMessage('statusPedidoCliente');


async function sendWebHook(url:string,data: string):Promise<Response>{
  return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: data
        })
    })
}
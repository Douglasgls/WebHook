import amqp, { Channel } from 'amqplib';

console.log('Exemplo 2');

async function reciveMessage(queue:string){
    const connection =  await amqp.connect('amqp://guest:guest@localhost');
    const channel: Channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: true
    });

    channel.assertExchange('notifications', 'direct',{
        durable: false
    })

    channel.bindQueue(queue, 'notifications', 'sms');
    channel.bindQueue(queue, 'notifications', 'email');

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, async function(msg) {
    console.log(" [x] Received %s", msg?.content.toString());
    if(msg){
        if(msg.content.toString() === 'SMS'){
            const sendGerente = await sendWebHook('http://localhost:3000/gerente/webhook/sms', msg.content.toString())
            console.log(" Resposta gerente: ", await sendGerente.json());
        }
        if(msg.content.toString() === 'EMAIL'){
            const sendGerente = await sendWebHook('http://localhost:3000/gerente/webhook/email', msg.content.toString())
            console.log(" Resposta gerente: ", await sendGerente.json());
        }
    }
    },{
        noAck: true
    })
}

reciveMessage('notifications');

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
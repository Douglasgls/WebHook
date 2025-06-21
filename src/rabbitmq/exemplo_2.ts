import amqp, { Channel } from 'amqplib';
import { Buffer } from 'buffer';

async function sendToQueueExchange(message:string, router_key:string):Promise<Boolean>{
    const connection =  await amqp.connect('amqp://guest:guest@localhost');
    const channel: Channel = await connection.createChannel();

    channel.assertExchange('notifications', 'direct',{
        durable: false
    })

    channel.publish('notifications', router_key, Buffer.from(message));
    
    return true
}

export default sendToQueueExchange;
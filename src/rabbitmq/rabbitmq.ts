import amqp, { Channel } from 'amqplib';
import { Buffer } from 'buffer';

async function sendToQueue(queue:string, message:string):Promise<Boolean>{
    // const connection =  await amqp.connect('amqp:localhost');
    const connection2 =  await amqp.connect('amqp://guest:guest@localhost');
    const channel: Channel = await connection2.createChannel();

    await channel.assertQueue(queue,{
        autoDelete:false,
        durable:true,
    })

    return channel.sendToQueue(queue, Buffer.from(message))

}

export default sendToQueue;
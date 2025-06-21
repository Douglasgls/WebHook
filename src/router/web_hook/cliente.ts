import { Router } from "express";
import sendToQueueExchange from "../../rabbitmq/exemplo_2";

const router = Router();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "FALAAA CLIENTE BONECAAASS"
    })
})

router.post("/webhook/status", (req, res) => {
    const data = req.body;
    res.status(200).json("Cliente recebeu alteração");
    console.log(data);
});

// Segundo exemplo usando roteamento bind e exchange

router.post("/sms/gerente", async (req, res) => {
    const enviado = await sendToQueueExchange('SMS', 'sms')
    res.status(200).json({
        message: "Aviso enviado com sucesso por SMS",
        rabbitMQ: enviado
    })
})

router.post("/email/gerente", async (req, res) => {
    const enviado = await sendToQueueExchange('EMAIL', 'email')
    res.status(200).json({
        message: "Aviso enviado com sucesso por EMAIL",
        rabbitMQ: enviado
    })
})

export default router;
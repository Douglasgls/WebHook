import { Router } from "express";
import sqlite3 from "sqlite3";
import sendToQueue from "../../rabbitmq/rabbitmq";

const router = Router();

sqlite3.verbose();

const db = new sqlite3.Database("./bandoDados.db")

router.post("/webhook/status/:id/:status", async (req, res) => {  
    const { id, status } = req.params;
    const enviado = await sendToQueue('statusPedidoCliente', status.toUpperCase())
    db.run("UPDATE cliente SET status = ? WHERE id = ?", [status.toUpperCase(), id]);
    res.status(200).json({
        message: "Dados alterados com sucesso",
        rabbitMQ: enviado
    })
});


export default router;
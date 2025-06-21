import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "FALAAA GERENTE BONECAAASS"
    })
})

router.post("/webhook/status", (req, res) => {
    const data = req.body;
    res.status(200).json("Gerente recebeu alteração");
    console.log(data);
});
// Segundo exemplo usando roteamento bind e exchange

router.post("/webhook/sms", async (req, res) => {
    const data = req.body;
    res.status(200).json("Gerente recebeu alteração");
    console.log("FUI AVISADO POR SMS", data);
})

router.post("/webhook/email", async (req, res) => {
    const data = req.body;
    res.status(200).json("Gerente recebeu alteração");
    console.log("FUI AVISADO POR EMAIL", data);
})

export default router;
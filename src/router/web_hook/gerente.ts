import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "FALAAA GERENTE BONECAAASS"
    })
})


router.post("/webhook/status", (req, res) => {
    const data = req.body;
    console.log(data);
});

export default router;
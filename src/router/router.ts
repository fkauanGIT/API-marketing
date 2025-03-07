import { Router } from "express";
import { LeadsController } from "../controllers/LeadsController";

const router = Router()

const leadsController = new LeadsController()

router.get("/leads", leadsController.index)
router.get("/leads/:id", leadsController.show)
router.post("/leads", leadsController.create)
router.put("/leads/:id", leadsController.update)
router.delete("/leads/:id", leadsController.delete)



router.get("./status", (req, res) => {
    res.json( {message: "OK"} )
})

export { router }
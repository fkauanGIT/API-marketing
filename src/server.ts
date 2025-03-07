import cors from "cors"
import express from "express"
import { router } from "./router/router"
import { errorHandlerMiddleware } from "./middlewares/error-handler"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)
app.use(errorHandlerMiddleware)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
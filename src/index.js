const express = require("express")
const rotas = require("./routes")

const app = express()
app.use(express.json()) 
app.use(rotas)

app.listen(3000, () => {
    console.log(`🚀 Server Started on port 3000 🚀`)
})
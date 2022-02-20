const express = require("express")
const path = require("path")
const cors = require("cors")
const navRouter = require("./routers/nav.js")

const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")))
app.use(cors())

// Router imports
app.use("/", navRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})
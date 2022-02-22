const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const navRouter = require("./routers/nav.js")
const accountRouter = require("./routers/account.js")

const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.json())
app.use(cors())

// Router imports
app.use(navRouter)
app.use(accountRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})
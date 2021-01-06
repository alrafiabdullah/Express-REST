const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")

const newMulter = multer()
const app = express()

app.use(newMulter.array())
app.use(express.static("public"))
app.use(bodyParser.json())

let storage = multer.diskStorage({
    function(req, file, callback) {
        callback(null, "./uploads")
    },
    function(req, file, callback) {
        callback(null, file.originalname)
    }
})

let upload = multer({ storage: storage }).single("myfile")

app.get("/", (req, res) => {
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    // res.send(`First Name: ${firstName}\nLast Name: ${lastName}`)

    let first = req.header("firstName")
    let last = req.header("lastName")

    res.send(`${first} ${last}`)

})

app.post("/create", (req, res) => {
    let JSONData = req.body;
    let name = JSONData["name"]
    let spouse = JSONData["spouse"]
    let JSONString = JSON.stringify(JSONData)

    res.send(`${name} + ${spouse}`)
})

app.post("/form", (req, res) => {
    let JSONData = req.body

    res.send(JSON.stringify(JSONData))
})

// Doesn't work
app.post("/upload", upload, (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.send("File upload failed!")
        } else {
            res.send("File uploaded successfully!")
        }
    })
})

app.listen(8000, "127.0.0.1", () => {
    console.log("Server started...");
})
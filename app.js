const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const LocationModel = require("./models/LocationModel")
const connectDB = require("./config/db")

const app = express()
const server = http.createServer(app)

connectDB()

const io = socketio(server)

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) => {
    //console.log("connected io")
    
    socket.on("send-location", async (data) => {
        try {
            const location = new LocationModel(data);
            await location.save();
            console.log(location)
            io.emit("receive-location", { id: socket.id, ...data });
        } catch (error) {
            console.error("Error saving location:", error);
        }
    })

    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running")
})
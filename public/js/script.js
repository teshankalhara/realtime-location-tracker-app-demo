const socket = io()

//console.log("Hi")

/*users
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {//watch position database for users
        const { latitude, longitude } = {latitude:6.9271, longitude:79.8612}
        socket.emit("send-location", { latitude, longitude })
    }, (error) => {
        console.log(error)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    })
}
*/

//bus
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit("send-location", { latitude, longitude })
    }, (error) => {
        console.log(error)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    })
}

const map = L.map("map").setView([0, 0], 10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map)

const markers = {}

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data
    map.setView([latitude, longitude], 16)
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude])
    } else {///set location marker
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id])
        delete markers[id]
    }
})
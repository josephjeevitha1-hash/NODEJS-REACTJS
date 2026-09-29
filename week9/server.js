const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

// Event Module
const eventEmitter = new EventEmitter();

eventEmitter.on("customEvent", (data) => {
    console.log("Custom Event Triggered:", data);
});

// HTTP Module
const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello, World!");
});

// OS Module
console.log("System Information:");
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());

// Path Module
const filePath = path.join(__dirname, "example.txt");

console.log("\nJoined Path:");
console.log(filePath);

// Start Server
const PORT = 3000;

server.listen(PORT, () => {

    console.log("Server running at http://localhost:" + PORT);

    // Trigger Event
    eventEmitter.emit("customEvent", {
        message: "Hello from custom event!"
    });
});

const express = require("express");
const session = require("express-session");

const app = express();

// Configure Express Session
app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true
}));

// Home page
app.get("/", (req, res) => {
    res.send(`
        <h2>Transaction History Using Express Session</h2>

        <a href="/buy/laptop">Buy Laptop</a><br><br>
        <a href="/buy/mobile">Buy Mobile</a><br><br>
        <a href="/buy/headphone">Buy Headphone</a><br><br>

        <a href="/history">View Transaction History</a><br><br>
        <a href="/clear">Clear Transaction History</a>
    `);
});

// Purchase a product
app.get("/buy/:product", (req, res) => {

    const product = req.params.product;

    const products = {
        laptop: "Laptop",
        mobile: "Mobile",
        headphone: "Headphone"
    };

    // Create history array if it does not exist
    if (!req.session.history) {
        req.session.history = [];
    }

    // Add transaction to session
    req.session.history.push(products[product]);

    // Display session details in VS Code terminal
    console.log("Session ID:", req.sessionID);
    console.log("Session History:", req.session.history);

    res.send(`
        <h2>${products[product]} Purchased Successfully!</h2>
        <a href="/">Home</a><br><br>
        <a href="/history">View Transaction History</a>
    `);
});

// View transaction history
app.get("/history", (req, res) => {

    const history = req.session.history || [];

    console.log("Session ID:", req.sessionID);
    console.log("Session History:", history);

    res.send(`
        <h2>Transaction History</h2>
        <p>${history.join(", ") || "No transactions yet"}</p>
        <a href="/">Home</a>
    `);
});

// Clear transaction history
app.get("/clear", (req, res) => {

    req.session.history = [];

    console.log("Transaction History Cleared");

    res.send(`
        <h2>Transaction History Cleared!</h2>
        <a href="/">Home</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


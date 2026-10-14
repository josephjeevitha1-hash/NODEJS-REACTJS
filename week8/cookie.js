const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

// Home page
app.get("/", (req, res) => {
    res.send(`
        <h2>Transaction History Using Cookies</h2>

        <a href="/buy/laptop">Buy Laptop</a><br><br>
        <a href="/buy/mobile">Buy Mobile</a><br><br>
        <a href="/buy/headphone">Buy Headphone</a><br><br>

        <a href="/history">View Transaction History</a><br><br>
        <a href="/clear">Clear Transaction History</a>
    `);
});

// Purchase a product
app.get("/buy/:product", (req, res) => {

    const products = {
        laptop: "Laptop",
        mobile: "Mobile",
        headphone: "Headphone"
    };

    const product = req.params.product;

    // Validate product
    if (!products[product]) {
        return res.status(404).send("Product not found");
    }

    // Read existing history from cookie
    let history = req.cookies.history || "";

    // Add new transaction
    history += products[product] + ",";

    // Save updated history in browser cookie
    res.cookie("history", history, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });

    res.send(`
        <h2>${products[product]} Purchased Successfully!</h2>
        <a href="/">Home</a><br><br>
        <a href="/history">View Transaction History</a>
    `);
});

// Display transaction history
app.get("/history", (req, res) => {

    const history = req.cookies.history || "";

    console.log("Cookie History:", history);

    res.send(`
        <h2>Transaction History</h2>
        <p>${history || "No transactions yet"}</p>
        <a href="/">Home</a>
    `);
});

// Clear transaction history
app.get("/clear", (req, res) => {

    res.clearCookie("history");

    res.send(`
        <h2>Transaction History Cleared!</h2>
        <a href="/">Home</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MYSQL@123",
    database: "shopping_cart"
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});


// Open catalog page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/catalog.html");
});


// Add product to cart
app.post("/add-to-cart", (req, res) => {

    const { name, price } = req.body;

    const sql = `
        INSERT INTO cart (product_name, price, quantity)
        VALUES (?, ?, 1)
    `;

    db.query(sql, [name, price], err => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.send("Added");
    });
});


// Display cart
app.get("/cart", (req, res) => {

    db.query("SELECT * FROM cart", (err, result) => {

        if (err) {
            return res.status(500).send("Error");
        }

        res.json(result);
    });
});


// Update quantity
app.put("/update-cart/:id", (req, res) => {

    const id = req.params.id;
    const quantity = req.body.quantity;

    if (quantity <= 0) {

        db.query(
            "DELETE FROM cart WHERE id = ?",
            [id],
            err => {

                if (err) {
                    return res.status(500).send("Error");
                }

                res.send("Deleted");
            }
        );

    } else {

        db.query(
            "UPDATE cart SET quantity = ? WHERE id = ?",
            [quantity, id],
            err => {

                if (err) {
                    return res.status(500).send("Error");
                }

                res.send("Updated");
            }
        );
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));


// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MYSQL@123",
    database: "shopping_cart"
});


db.connect(err => {

    if (err) {
        console.log("MySQL Connection Error:", err);
    } else {
        console.log("MySQL Connected");
    }

});


// Open Catalog Page
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/catalog.html");

});


// Add Product to Cart
app.post("/add-to-cart", (req, res) => {

    const { name, price } = req.body;


    // Check whether product already exists
    const checkSql = `
        SELECT * FROM cart
        WHERE product_name = ?
    `;


    db.query(checkSql, [name], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).send("Error");

        }


        // Product already exists
        if (result.length > 0) {

            const updateSql = `
                UPDATE cart
                SET quantity = quantity + 1
                WHERE product_name = ?
            `;


            db.query(updateSql, [name], err => {

                if (err) {

                    console.log(err);

                    return res.status(500).send("Error");

                }


                res.send("Quantity Updated");

            });

        }


        // Product does not exist
        else {

            const insertSql = `
                INSERT INTO cart
                (product_name, price, quantity)
                VALUES (?, ?, 1)
            `;


            db.query(insertSql, [name, price], err => {

                if (err) {

                    console.log(err);

                    return res.status(500).send("Error");

                }


                res.send("Product Added");

            });

        }

    });

});


// Display Cart
app.get("/cart", (req, res) => {

    db.query("SELECT * FROM cart", (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).send("Error");

        }


        res.json(result);

    });

});


// Update Quantity
app.put("/update-cart/:id", (req, res) => {

    const id = req.params.id;

    const quantity = req.body.quantity;


    // Delete product when quantity becomes 0
    if (quantity <= 0) {

        db.query(
            "DELETE FROM cart WHERE id = ?",
            [id],
            err => {

                if (err) {

                    console.log(err);

                    return res.status(500).send("Error");

                }


                res.send("Deleted");

            }
        );

    }


    // Update quantity
    else {

        db.query(
            "UPDATE cart SET quantity = ? WHERE id = ?",
            [quantity, id],
            err => {

                if (err) {

                    console.log(err);

                    return res.status(500).send("Error");

                }


                res.send("Updated");

            }
        );

    }

});


// Start Server
app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});

function loadCart() {

    fetch("/cart")

        .then(res => res.json())

        .then(data => {

            let body = document.getElementById("cartBody");
            let total = 0;

            body.innerHTML = "";

            data.forEach(item => {

                let amount = item.price * item.quantity;

                total += amount;

                body.innerHTML += `
                    <tr>

                        <td>${item.product_name}</td>

                        <td>₹${item.price}</td>

                        <td>

                            <button onclick="
                                updateQuantity(${item.id}, ${item.quantity - 1})
                            ">-</button>

                            ${item.quantity}

                            <button onclick="
                                updateQuantity(${item.id}, ${item.quantity + 1})
                            ">+</button>

                        </td>

                        <td>₹${amount}</td>

                    </tr>
                `;
            });

            document.getElementById("grandTotal").textContent = total;
        });
}


function updateQuantity(id, quantity) {

    fetch("/update-cart/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            quantity: quantity
        })

    })
    .then(() => loadCart());
}


loadCart();

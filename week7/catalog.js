function addToCart(name, price) {

    fetch("/add-to-cart", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            price: price
        })

    })
    .then(() => {
        location.href = "cart.html";
    });

}

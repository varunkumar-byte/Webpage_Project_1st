// Product Details

let products = [
    {id:101, name:"Keyboard (Logitech)", price:1800, stock:10},
    {id:102, name:"Mouse (Asus)", price:700, stock:15},
    {id:103, name:"Monitor (Logitech)", price:27000, stock:25},
    {id:104, name:"Headphones (Sony)", price:1500, stock:18},
    {id:105, name:"Webcam (Canon)", price:2500, stock:12},
    {id:106, name:"USB Drive (Transcend)", price:500, stock:20},
    {id:107, name:"External Hard Drive", price:4500, stock:27},
    {id:108, name:"Graphics Card", price:35000, stock:13},
    {id:109, name:"RAM (Corsair)", price:8000, stock:16},
    {id:110, name:"Motherboard (MSI)", price:22000, stock:34}
];

let cart = [];


// Display Products

function displayProducts() {

    let output = "";

    products.forEach(p => {

        output += `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td>
                <button onclick="addToCart(${p.id})">
                    Add to Cart
                </button>

                <button class="delete"
                onclick="removeProduct(${p.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("productList").innerHTML = output;

    updateDashboard();
}


// Add New Product

function addProduct() {

    let id = Number(document.getElementById("pid").value);
    let name = document.getElementById("pname").value.trim();
    let price = Number(document.getElementById("price").value);
    let stock = Number(document.getElementById("stock").value);

    if (!Number.isInteger(id) || id <= 0 || !name ||
        !Number.isFinite(price) || price <= 0 ||
        !Number.isInteger(stock) || stock < 0) {

        alert("Please enter valid product details!");
        return;
    }

    if (products.some(p => p.id === id)) {

        alert("Product ID already exists!");
        return;
    }

    products.push({
        id: id,
        name: name,
        price: price,
        stock: stock
    });

    displayProducts();

    alert("Product Added Successfully!");

}


// Remove Product

function removeProduct(id) {

    products = products.filter(p => p.id !== id);

    cart = cart.filter(item => item.id !== id);

    displayProducts();
    displayCart();

    alert("Product Removed!");

}


// Add to Cart

function addToCart(id) {

    let product = products.find(p => p.id === id);

    let quantity = Number(prompt("Enter Quantity:"));

    if (!Number.isInteger(quantity) || quantity <= 0) {

        alert("Enter a valid quantity!");
        return;
    }

    if (quantity > product.stock) {

        alert("Insufficient Stock!");
        return;
    }

    let existing = cart.find(item => item.id === id);

    if (existing) {

        if (existing.quantity + quantity > product.stock) {

            alert("Insufficient Stock!");
            return;
        }

        existing.quantity += quantity;

    } else {

        cart.push({
            id: id,
            quantity: quantity
        });

    }

    displayCart();

}


// Display Cart

function displayCart() {

    let output = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {

        let product = products.find(p => p.id === item.id);

        let amount = product.price * item.quantity;

        total += amount;
        count += item.quantity;

        output += `
            <div class="cart-item">
                ${product.name}
                | Quantity: ${item.quantity}
                | Amount: ₹${amount}
            </div>
        `;

    });

    document.getElementById("cartList").innerHTML =
        output || "Your cart is empty.";

    document.getElementById("cartTotal").innerText =
        "Total: ₹" + total;

    document.getElementById("cartCount").innerText = count;

}


// Place Order

function placeOrder() {

    if (cart.length === 0) {

        alert("Your Cart is Empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {

        let product = products.find(p => p.id === item.id);

        total += product.price * item.quantity;

    });

    if (confirm("Confirm Order? Total: ₹" + total)) {

        cart.forEach(item => {

            let product = products.find(p => p.id === item.id);

            product.stock -= item.quantity;

        });

        cart = [];

        displayProducts();
        displayCart();

        alert("Order Placed Successfully!");

    }

}


// Update Dashboard

function updateDashboard() {

    let value = 0;

    products.forEach(p => {

        value += p.price * p.stock;

    });

    document.getElementById("totalProducts").innerText =
        products.length;

    document.getElementById("inventoryValue").innerText =
        "₹" + value;

}


// Customer Feedback

function submitFeedback() {

    let feedback = document.getElementById("feedback").value.trim();

    if (feedback === "") {

        alert("Please Enter Feedback!");
        return;
    }

    alert("Thank You for Your Feedback!");

    document.getElementById("feedback").value = "";

}


// Initial Display

displayProducts();
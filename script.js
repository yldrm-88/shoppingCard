document.addEventListener('DOMContentLoaded', () => {
    const quantityButtons = document.querySelectorAll('.quantity-button');

    quantityButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const quantityInput = document.getElementById('p-count-' + id);
            let currentValue = parseInt(quantityInput.value);
            if (e.target.classList.contains('minus')) {
                if (currentValue > parseInt(quantityInput.min)) {
                    quantityInput.value = currentValue - 1;
                }
            } else if (e.target.classList.contains('plus')) {
                quantityInput.value = currentValue + 1;
            }
        });
    });

    const cartButtons = document.querySelectorAll('.btn-cart');
    const cartCountElement = document.getElementById('cart-count');

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            AddCart(e);
            updateCartCount();
        });
    });
    updateCartCount();
});

const localStorage = window.localStorage;

function updateCartCount() {
    const carts = GetCartsFromStorage();
    const totalItems = carts.reduce((sum, item) => sum + item.product_count, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

function AddCart(e) {
    const id = e.target.getAttribute('data-id');
    const productName = document.getElementById('p-name-' + id).innerText;
    const priceElement = document.getElementById('p-price-' + id);
    const price = parseInt(priceElement.getAttribute('data-price'));
    const quantityInput = document.getElementById('p-count-' + id);
    const count = parseInt(quantityInput.value);

    const cart = {
        product_name: productName,
        product_price: price,
        product_count: count,
        total_price: price * count
    };

    AddCartsToStorage(cart);
    showAlert();
}

function GetCartsFromStorage() {
    let carts;
    if (localStorage.getItem("carts") === null) {
        carts = [];
    } else {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    return carts;
}

function AddCartsToStorage(data) {
    const carts = GetCartsFromStorage();
    carts.push(data);
    localStorage.setItem("carts", JSON.stringify(carts));
}

function DeleteCartsFromStorage(id) {
    let carts = GetCartsFromStorage();
    carts.splice(id, 1);
    localStorage.setItem("carts", JSON.stringify(carts));
}

function showAlert() {
    const alert = document.getElementById('success-alert');
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000);
}
